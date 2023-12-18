import { User } from "@prisma/client";
import SearchUserItem from "./search-user-item";
import { RefObject } from "react";
import clsx from "@/lib/clsx";

interface SearchModalContentProps {
  filteredUsers: User[];
  usersElementsRef: RefObject<HTMLDivElement[]>;
  selectedUserId: string;
  setActiveUser: (id: string, rect: DOMRect) => void;
  isLoading: boolean;
}
export default function SearchModalContent({
  filteredUsers,
  usersElementsRef,
  selectedUserId,
  setActiveUser,
  isLoading,
}: SearchModalContentProps) {
  
  return (
    <div
      className={clsx("h-60 overflow-y-scroll", isLoading && "animate-pulse")}
    >
      {filteredUsers.map(({ avatar, id, username }, idx) => (
        <SearchUserItem
          key={id}
          ref={(ref) => {
            if (usersElementsRef?.current && ref) {
              usersElementsRef.current[idx] = ref;
            }
          }}
          id={id}
          active={id === selectedUserId}
          setActive={setActiveUser}
          avatar={
            avatar ?? "https://avatars.githubusercontent.com/u/16727448?v=4"
          }
          username={username.slice(0, 8)}
        />
      ))}
    </div>
  );
}
