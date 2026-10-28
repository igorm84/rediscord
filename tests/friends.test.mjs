import { beforeEach, expect, test } from "bun:test";
import { useFriendStore } from "../src/state/friend-list";
import { useFriendRequestStore } from "../src/state/friendRequest-list";
import { useChannelStore } from "../src/state/channel-list";
import {
  PREVIEW_FRIENDS,
  PREVIEW_FRIEND_REQUESTS,
  PREVIEW_STATIC_PARAMS,
  getPreviewChannelById,
} from "../src/lib/utils/mock";

beforeEach(() => {
  useFriendStore.setState({ friends: PREVIEW_FRIENDS });
  useFriendRequestStore.setState({ friendRequest: PREVIEW_FRIEND_REQUESTS });
});

test("friendship exists by ID before visiting the friends page", () => {
  for (const channel of useChannelStore.getState().channels) {
    expect(
      useFriendStore.getState().friends.some(({ id }) => id === channel.id),
    ).toBe(true);
  }
});

test("accepting a request updates both stores and is idempotent", () => {
  const friend = PREVIEW_FRIEND_REQUESTS[0];
  const { acceptRequest } = useFriendRequestStore.getState();
  acceptRequest(friend.id);
  acceptRequest(friend.id);
  expect(useFriendRequestStore.getState().friendRequest).toHaveLength(5);
  expect(
    useFriendStore.getState().friends.filter(({ id }) => id === friend.id),
  ).toHaveLength(1);
});

test("declining does not add a friend; ID-based remove/add cannot duplicate", () => {
  useFriendRequestStore
    .getState()
    .declineRequest(PREVIEW_FRIEND_REQUESTS[0].id);
  expect(useFriendRequestStore.getState().friendRequest).toHaveLength(5);
  expect(useFriendStore.getState().friends).toHaveLength(18);
  const friend = PREVIEW_FRIENDS[0];
  useFriendStore.getState().removeFriend(friend.id);
  expect(useFriendStore.getState().friends).toHaveLength(17);
  useFriendStore.getState().addFriend({ ...friend });
  useFriendStore.getState().addFriend({ ...friend });
  expect(useFriendStore.getState().friends).toHaveLength(18);
});

test("all accepted request recipients have static chat routes; unknown IDs do not", () => {
  for (const friend of PREVIEW_FRIEND_REQUESTS) {
    expect(PREVIEW_STATIC_PARAMS.some(({ id }) => id === friend.id)).toBe(true);
    expect(getPreviewChannelById(friend.id)?.name).toBe(friend.name);
  }
  expect(getPreviewChannelById("unknown")).toBeUndefined();
});
