import { RefObject, useEffect, useMemo, useState } from "react";
import useSearchModalInteraction from "./useSearchModalInteraction";
import { generateRandomFakeUsers } from "@/lib/utils/mock";

export const BASE_ARROW_GROUP_Y_POS = 44;
type ArrowGroupStatus = "idle" | "focus";

const fakeUsers = generateRandomFakeUsers(40);

export default function useSeachModal({
  defaultOpen,
  filterValue,
  parentRef,
  filteredUsersElements,
}: {
  defaultOpen: boolean;
  filterValue: string;
  parentRef: RefObject<HTMLDivElement>;
  filteredUsersElements: HTMLDivElement[];
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // Relative position to parent container
  const [arrowGroupYPos, setArrowGroupYPos] = useState(BASE_ARROW_GROUP_Y_POS);
  const [arrowGroupStatus, setArrowGroupStatus] =
    useState<ArrowGroupStatus>("idle");

  const filteredUsers = useMemo(
    () =>
      fakeUsers.filter((v) => v.username.toLowerCase().includes(filterValue)),
    [filterValue],
  );

  function setActiveUser(id: string, rect: DOMRect) {
    const relativeY =
      rect.y - (parentRef.current?.getBoundingClientRect().y ?? 0);
    setArrowGroupYPos(relativeY);
    setArrowGroupStatus("focus");
    setSelectedUserId(id);
  }

  // Using for better accessibility using ArrowUp/ArrowDown
  useSearchModalInteraction({
    selectedUserId,
    setActiveUser,
    setOpen,
    filteredUsers,
    filteredUsersElements,
  });

  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  useEffect(() => {
    const firstUserEl = filteredUsersElements[0];

    if (
      (!filterValue || !filteredUsers.length) &&
      arrowGroupStatus === "focus"
    ) {
      setArrowGroupStatus("idle");
    }

    if (filteredUsers.length && filterValue && firstUserEl) {
      setActiveUser(filteredUsers[0].id, firstUserEl.getBoundingClientRect());

      parentRef.current?.scrollTo({ top: 0 });
    } else {
      setArrowGroupYPos(BASE_ARROW_GROUP_Y_POS);
      setSelectedUserId(null);
    }
  }, [filteredUsers, filterValue]);

  return {
    selectedUserId,
    setSelectedUserId,
    open,
    setOpen,
    arrowGroupYPos,
    arrowGroupStatus,
    setArrowGroupYPos,
    setActiveUser,
    filteredUsers,
  };
}
