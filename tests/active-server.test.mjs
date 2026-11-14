import { expect, test } from "bun:test";
import {
  DIRECT_MESSAGES_ID,
  getActiveServerId,
} from "../src/lib/navigation/active-server";
import { PREVIEW_CHANNELS, PREVIEW_SERVERS } from "../src/lib/utils/mock";

test("server routes select that server", () => {
  const server = PREVIEW_SERVERS[3];
  expect(getActiveServerId(`/channels/${server.id}`, PREVIEW_SERVERS)).toBe(
    server.id,
  );
});

test("friends, DM and other routes select direct messages", () => {
  for (const pathname of [
    "/channels/me",
    `/channels/${PREVIEW_CHANNELS[0].id}`,
    "/nitro",
    "/message-requests",
    "/",
    null,
  ]) {
    expect(getActiveServerId(pathname, PREVIEW_SERVERS)).toBe(
      DIRECT_MESSAGES_ID,
    );
  }
});
