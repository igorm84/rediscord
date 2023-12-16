"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import useSeachModal from "@/lib/hooks/search-modal/useSeachModal";
import { useRef, useState } from "react";
import SearchUserItem from "./search-user-item";
import ArrowGroup from "./arrow-group";
import SearchModalHeader from "./search-modal-header";

interface SearchModalProps {
  defaultOpen?: boolean;
}

export default function SearchModal({ defaultOpen = false }: SearchModalProps) {
  const [filterValue, setFilterValue] = useState("");

  const parentRef = useRef<HTMLDivElement>(null);
  const filteredUsersElementsRef = useRef<HTMLDivElement[]>([]);

  const {
    open,
    setOpen,
    selectedUserId,
    setActiveUser,
    arrowGroupYPos,
    arrowGroupStatus,
    filteredUsers
  } = useSeachModal({
    defaultOpen,
    filterValue,
    filteredUsersElements: filteredUsersElementsRef.current,
    parentRef,
  });

  // cut unnecessary elements
  filteredUsersElementsRef.current.length = filteredUsers.length;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent ref={parentRef} role="search-dialog-content">
        <SearchModalHeader
          arrowBgActive={arrowGroupStatus === "idle"}
          setFilterValue={setFilterValue}
        />
        <div className="h-60 overflow-y-scroll">
          {filteredUsers.map(({ avatar, id, username }, idx) => (
            <SearchUserItem
              key={id}
              ref={(ref) => (filteredUsersElementsRef.current[idx] = ref!)}
              id={id}
              active={id === selectedUserId}
              setActive={setActiveUser}
              avatar={avatar!}
              username={username.slice(0, 8)}
            />
          ))}
        </div>
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
        <ArrowGroup active={arrowGroupStatus === "focus"} yPosition={arrowGroupYPos} />
      </DialogContent>
    </Dialog>
  );
}
