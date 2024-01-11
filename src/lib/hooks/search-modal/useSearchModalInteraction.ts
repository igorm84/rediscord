import {
  SEARCH_MODAL_EVENT,
  SearchModalEvent,
} from "@/lib/events/searchModalEvent";
import { User } from "@prisma/client";
import { useEffect } from "react";

export default function useSearchModalInteraction({
  setOpen,
  filteredUsersElements,
  setActiveUser,
  selectedUserId,
  filteredUsers,
}: {
  filteredUsersElements: HTMLDivElement[];
  filteredUsers: User[];
  selectedUserId: string | null;
  setOpen: (v: boolean) => void;
  setActiveUser: (id: string, rect: DOMRect) => void;
}) {
  // Handle arrowUp/arrowDown keys
  useEffect(() => {
    const scrollIntoView = (index: number) => {
      const el = filteredUsersElements[index];
      if (el) {
        el.scrollIntoView({
          behavior: "instant",
          block: "nearest",
        });
      }
    };
    const handleEvent = (e: KeyboardEvent) => {
      const currUserIdx = filteredUsers.findIndex(
        ({ id }) => id === selectedUserId,
      );

      if (e.key === "ArrowUp" && currUserIdx !== -1) {
        const newUserIdx = currUserIdx - 1;

        if (newUserIdx >= 0) {
          scrollIntoView(newUserIdx);
          setActiveUser(
            filteredUsers[newUserIdx].id,
            filteredUsersElements[newUserIdx]?.getBoundingClientRect()!,
          );
        }
      } else if (e.key === "ArrowDown") {
        const newUserIdx = currUserIdx + 1;
        if (newUserIdx < filteredUsers.length) {
          scrollIntoView(newUserIdx);
          setActiveUser(
            filteredUsers[newUserIdx].id,
            filteredUsersElements[newUserIdx]?.getBoundingClientRect()!,
          );
        }
      }
    };
    window.addEventListener("keydown", handleEvent);
    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, [filteredUsers, filteredUsersElements, selectedUserId, setActiveUser]);

  // Handle open modal window
  useEffect(() => {
    const handleEvent = (event: Event) => {
      const { detail } = event as SearchModalEvent;
      setOpen(detail.action === "open");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener(SEARCH_MODAL_EVENT, handleEvent);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(SEARCH_MODAL_EVENT, handleEvent);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpen]);
}
