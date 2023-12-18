"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import useSeachModal from "@/lib/hooks/search-modal/useSeachModal";
import { useEffect, useRef, useState } from "react";
import ArrowGroup from "./arrow-group";
import SearchModalHeader from "./search-modal-header";
import SearchModalContent from "./search-modal-content";
import useGetFilteredUsers from "@/lib/hooks/search-modal/useGetFilteredUsers";

interface SearchModalProps {
  defaultOpen?: boolean;
}

export default function SearchModal({ defaultOpen = false }: SearchModalProps) {
  const [filterValue, setFilterValue] = useState("");

  const parentRef = useRef<HTMLDivElement>(null);
  const filteredUsersElementsRef = useRef<HTMLDivElement[]>([]);

  const { data: filteredUsers, isFetching } = useGetFilteredUsers({
    filter: filterValue,
  });

  const {
    open,
    setOpen,
    selectedUserId,
    setActiveUser,
    arrowGroupYPos,
    arrowGroupStatus,
  } = useSeachModal({
    defaultOpen,
    filterValue,
    filteredUsers: filteredUsers ?? [],
    filteredUsersElements: filteredUsersElementsRef.current,
    parentRef,
  });

  useEffect(() => {
    return () => setFilterValue("");
  }, [open]);

  // cut unnecessary elements
  filteredUsersElementsRef.current.length = filteredUsers?.length ?? 0;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent ref={parentRef} role="search-dialog-content">
        <SearchModalHeader
          arrowBgActive={arrowGroupStatus === "idle"}
          setFilterValue={setFilterValue}
        />
        <SearchModalContent
          setActiveUser={setActiveUser}
          selectedUserId={selectedUserId!}
          filteredUsers={filteredUsers ?? []}
          usersElementsRef={filteredUsersElementsRef}
          isLoading={isFetching}
        />
        <DialogDescription>
          <span className="text-xs font-semibold text-gray-400">
            LAST CHANNELS
          </span>
          <span className="text-gray-500">
            No recent channels. Start a new search.
          </span>
        </DialogDescription>
        <div className="text-xs text-gray-400">
          <strong className="text-green-400">HERE&apos;s a TIP:</strong> Write
          @, #, ! or * in the beginning of your search to limit results.
        </div>
        <ArrowGroup
          active={arrowGroupStatus === "focus"}
          yPosition={arrowGroupYPos}
        />
      </DialogContent>
    </Dialog>
  );
}
