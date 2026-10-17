import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { setTimeout } from "node:timers/promises";

let baseURL = process.env.SMOKE_BASE_URL;
let server;
let serverOutput = "";

before(async () => {
  if (baseURL) return;

  const portProbe = createServer();
  portProbe.listen(0, "127.0.0.1");
  await once(portProbe, "listening");
  const { port } = portProbe.address();
  await new Promise((resolve) => portProbe.close(resolve));

  baseURL = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  for (let attempt = 0; attempt < 100; attempt++) {
    assert.equal(server.exitCode, null, serverOutput);
    try {
      const response = await fetch(new URL("/channels/me", baseURL), {
        signal: AbortSignal.timeout(1000),
      });
      await response.arrayBuffer();
      if (response.ok) return;
    } catch {
      // The production server may still be binding its port.
    }
    await setTimeout(100);
  }
  assert.fail(`Production server did not become ready.\n${serverOutput}`);
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  const exited = once(server, "exit");
  server.kill("SIGTERM");
  await exited;
});

const request = (path, options = {}) =>
  fetch(new URL(path, baseURL), {
    signal: AbortSignal.timeout(15000),
    ...options,
  });

test("the home URL permanently redirects to Friends", async () => {
  const response = await request("/", { redirect: "manual" });
  assert.equal(response.status, 308);
  assert.equal(
    new URL(response.headers.get("location"), baseURL).pathname,
    "/channels/me",
  );
});

test("public pages retain their metadata and load successfully", async () => {
  for (const path of [
    "/channels/me",
    "/nitro",
    "/message-requests",
    "/skeleton",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.match(
      await response.text(),
      /<title>Rediscord - Reimaginated Discord app<\/title>/,
    );
  }
});

test("all 36 existing DM and server channel URLs remain available", async () => {
  const ids = Array.from({ length: 18 }, (_, index) => [
    `100000000000000${101 + index}`,
    `200000000000000${String(index + 1).padStart(3, "0")}`,
  ]).flat();
  for (const id of ids) {
    const response = await request(`/channels/${id}`);
    assert.equal(response.status, 200, id);
    assert.doesNotMatch(await response.text(), /<h1[^>]*>Not found<\/h1>/);
  }
});

test("unknown routes and channels keep the existing 404 page", async () => {
  for (const path of ["/does-not-exist", "/channels/does-not-exist"]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
    assert.match(await response.text(), /Go back home/);
  }
});

test("the page's JavaScript, CSS, and font assets are served", async () => {
  const response = await request("/channels/me");
  const html = await response.text();
  const assets = [
    ...new Set(
      [...html.matchAll(/(?:src|href)="([^\"]+)"/g)]
        .map((match) => match[1].replaceAll("&amp;", "&"))
        .filter((url) => url.startsWith("/_next/static/")),
    ),
  ];
  assert.ok(
    assets.some((url) => url.includes(".js")),
    "JavaScript assets",
  );
  assert.ok(
    assets.some((url) => url.includes(".css")),
    "CSS assets",
  );
  assert.ok(
    assets.some((url) => url.includes(".woff2")),
    "Self-hosted font assets",
  );
  for (const asset of assets) {
    const assetResponse = await request(asset);
    assert.equal(assetResponse.status, 200, asset);
    assert.ok((await assetResponse.arrayBuffer()).byteLength > 0, asset);
  }
});

test("local illustrations and the image optimizer still work", async () => {
  for (const path of [
    "/Waiting.svg",
    "/NotFoundSearching.svg",
    "/Joyride.svg",
    "/hashtag.png",
    "/favicon.ico",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.ok((await response.arrayBuffer()).byteLength > 0, path);
  }
  const image = await request("/_next/image?url=%2Fhashtag.png&w=32&q=75");
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /^image\//);
  assert.ok((await image.arrayBuffer()).byteLength > 0);
});
