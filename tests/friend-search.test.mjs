import { expect, test } from "bun:test";
import { searchFriends } from "../src/lib/utils/friend-search";
import { PREVIEW_FRIENDS } from "../src/lib/utils/mock";

test("searches the whole collection before limiting results", () => {
  expect(
    searchFriends(PREVIEW_FRIENDS, "Lena Park").map(({ name }) => name),
  ).toEqual(["Lena Park"]);
  expect(searchFriends(PREVIEW_FRIENDS, "cole")[0].name).toBe("Cole Nash");
  expect(searchFriends(PREVIEW_FRIENDS, "")).toHaveLength(6);
});
test("search accepts usernames, whitespace and case without mutating friends", () => {
  expect(searchFriends(PREVIEW_FRIENDS, "  THEOB  ")[0].name).toBe(
    "Theo Brooks",
  );
  expect(searchFriends(PREVIEW_FRIENDS, "unknown")).toEqual([]);
  expect(PREVIEW_FRIENDS).toHaveLength(18);
});
