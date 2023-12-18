import { RefObject, useEffect, useState } from "react";
import useSearchModalInteraction from "./useSearchModalInteraction";
import { User } from "@prisma/client";

export const BASE_ARROW_GROUP_Y_POS = 44;
type ArrowGroupStatus = "idle" | "focus";

interface UseSearchModalProps {
  defaultOpen: boolean;
  filterValue: string;
  parentRef: RefObject<HTMLDivElement>;
  filteredUsersElements: HTMLDivElement[];
  filteredUsers: User[];
}

export default function useSeachModal({
  defaultOpen,
  filterValue,
  parentRef,
  filteredUsers,
  filteredUsersElements,
}: UseSearchModalProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // Relative position to parent container
  const [arrowGroupYPos, setArrowGroupYPos] = useState(BASE_ARROW_GROUP_Y_POS);
  const [arrowGroupStatus, setArrowGroupStatus] =
    useState<ArrowGroupStatus>("idle");

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
    filteredUsers: filteredUsers ?? [],
    filteredUsersElements,
  });
  
  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  useEffect(() => {
    const firstUserEl = filteredUsersElements[0];

    if (
      (!filterValue || !filteredUsers?.length) &&
      arrowGroupStatus === "focus"
    ) {
      setArrowGroupStatus("idle");
    }

    if (filteredUsers?.length && filterValue && firstUserEl) {
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
    filteredUsers: filteredUsers ?? [],
  };
}