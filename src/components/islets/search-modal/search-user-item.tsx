import clsx from "@/lib/clsx";
import { User } from "@prisma/client";
import { forwardRef } from "react";
import Image from "next/image";

type SearchUserItemProps = Pick<User, "avatar" | "id" | "username"> & {
  active?: boolean;
  setActive: (id: string, rect: DOMRect) => void;
};

const SearchUserItem = forwardRef<HTMLDivElement | null, SearchUserItemProps>(
  ({ id, avatar, username, active, setActive }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={(e) =>
          setActive(id, e.currentTarget.getBoundingClientRect())
        }
        aria-selected={active}
        className={clsx(
          "flex min-h-[34px] w-full flex-1 items-center gap-2 px-[10px]",
          "cursor-pointer transition-all duration-300 ease-in-out",
          "flex-1",
          active && "rounded-md bg-selected/40",
        )}
      >
        <Image
          src={avatar!}
          width={20}
          height={20}
          className="rounded-full"
          alt="avatar"
        />
        <span className="text-[16px] text-gray-400">{username}</span>
        <span className="text-sm text-gray-500">@some other</span>
      </div>
    );
  },
);
export default SearchUserItem;
