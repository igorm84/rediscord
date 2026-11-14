import { Time } from "@/lib/entities/time";
import { CustomStatus } from "@/lib/entities/user";

const MINUTE = 60 * 1000;

/** When a custom status set at `now` should be cleared (null = never). */
export function getCustomStatusExpiry(
  clearAfter: Time,
  now = new Date(),
): number | null {
  switch (clearAfter) {
    case Time.ThirtyMinutes:
      return now.getTime() + 30 * MINUTE;
    case Time.OneHour:
      return now.getTime() + 60 * MINUTE;
    case Time.FourHours:
      return now.getTime() + 4 * 60 * MINUTE;
    case Time.DoNotClean:
      return null;
    case Time.Today:
    default: {
      const endOfDay = new Date(now);
      endOfDay.setHours(24, 0, 0, 0);
      return endOfDay.getTime();
    }
  }
}

/** Builds the custom status to store, or null to clear it. */
export function createCustomStatus(
  text: string,
  clearAfter: Time,
  now = new Date(),
): CustomStatus | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return {
    text: trimmed,
    clearAfter,
    expiresAt: getCustomStatusExpiry(clearAfter, now),
  };
}

/** The custom status if it is set and has not expired yet. */
export function getActiveCustomStatus(
  customStatus: CustomStatus | null | undefined,
  now = Date.now(),
): CustomStatus | null {
  if (!customStatus) return null;
  if (customStatus.expiresAt !== null && customStatus.expiresAt <= now) {
    return null;
  }
  return customStatus;
}
