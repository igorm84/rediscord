import { expect, test } from "bun:test";
import { Time } from "../src/lib/entities/time";
import {
  createCustomStatus,
  getActiveCustomStatus,
  getCustomStatusExpiry,
  updateCustomStatus,
} from "../src/lib/utils/custom-status";

const now = new Date(2026, 0, 15, 10, 30, 0);
const MINUTE = 60 * 1000;

test("clear-after options map to expiry times", () => {
  expect(getCustomStatusExpiry(Time.ThirtyMinutes, now)).toBe(
    now.getTime() + 30 * MINUTE,
  );
  expect(getCustomStatusExpiry(Time.OneHour, now)).toBe(
    now.getTime() + 60 * MINUTE,
  );
  expect(getCustomStatusExpiry(Time.FourHours, now)).toBe(
    now.getTime() + 240 * MINUTE,
  );
  expect(getCustomStatusExpiry(Time.DoNotClean, now)).toBeNull();
  expect(getCustomStatusExpiry(Time.Today, now)).toBe(
    new Date(2026, 0, 16, 0, 0, 0).getTime(),
  );
});

test("createCustomStatus trims text and clears on empty input", () => {
  expect(
    createCustomStatus("  reinforcements arrived ", Time.OneHour, now),
  ).toEqual({
    text: "reinforcements arrived",
    clearAfter: Time.OneHour,
    expiresAt: now.getTime() + 60 * MINUTE,
  });
  expect(createCustomStatus("   ", Time.OneHour, now)).toBeNull();
});

test("expired statuses are no longer active", () => {
  const status = createCustomStatus("brb", Time.ThirtyMinutes, now);
  expect(getActiveCustomStatus(status, now.getTime() + 29 * MINUTE)).toBe(
    status,
  );
  expect(getActiveCustomStatus(status, now.getTime() + 30 * MINUTE)).toBeNull();
  const forever = createCustomStatus("here", Time.DoNotClean, now);
  expect(getActiveCustomStatus(forever, now.getTime() + 1e12)).toBe(forever);
  expect(getActiveCustomStatus(null)).toBeNull();
});

test("saving an unchanged status keeps its original expiry", () => {
  const first = createCustomStatus("brb", Time.FourHours, now);
  const later = new Date(now.getTime() + 3 * 60 * MINUTE);
  expect(updateCustomStatus(first, " brb ", Time.FourHours, later)).toBe(first);
  // Changing the text or the clear-after option starts a new timer.
  expect(updateCustomStatus(first, "back soon", Time.FourHours, later)).toEqual(
    {
      text: "back soon",
      clearAfter: Time.FourHours,
      expiresAt: later.getTime() + 240 * MINUTE,
    },
  );
  expect(updateCustomStatus(first, "brb", Time.OneHour, later)?.expiresAt).toBe(
    later.getTime() + 60 * MINUTE,
  );
  // An expired status is replaced, not kept.
  const afterExpiry = new Date(now.getTime() + 5 * 60 * MINUTE);
  expect(
    updateCustomStatus(first, "brb", Time.FourHours, afterExpiry)?.expiresAt,
  ).toBe(afterExpiry.getTime() + 240 * MINUTE);
  expect(updateCustomStatus(first, "  ", Time.FourHours, later)).toBeNull();
});
