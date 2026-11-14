export const DIRECT_MESSAGES_ID = "default";

/**
 * Resolves which side menu entry is active for the current URL.
 * `/channels/<serverId>` selects that server; everything else in the app
 * (friends, DMs, nitro, message requests) belongs to "Direct messages".
 */
export function getActiveServerId(
  pathname: string | null,
  servers: ReadonlyArray<{ id: string }>,
) {
  const id = pathname?.match(/^\/channels\/([^/]+)/)?.[1];
  return id && servers.some((server) => server.id === id)
    ? id
    : DIRECT_MESSAGES_ID;
}
