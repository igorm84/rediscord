import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Button from "@/components/ui/button";
import clsx from "@/lib/clsx";
import { EmptyBox } from "../empty-box-image";
import Divider from "@/components/ui/divider";

export default function AddFriendTab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setFocusStatus] = useState(false);
  const [search, setSearchValue] = useState("");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid items-start">
        <div className="grid gap-2">
          <p className="text-[16px] uppercase">Add friend</p>
          <p className="text-gray-400">
            Here you can add friend by his username
          </p>
          <div
            className={clsx(
              "relative grid w-full grid-cols-[3fr_1fr] items-center",
              "justify-between rounded-md",
              "bg-background px-3 py-1",
              "h-[50px]",
              isFocus && "ring-blue-500 ring-4",
            )}
          >
            <Input
              ref={inputRef}
              onFocus={() => setFocusStatus(true)}
              onBlur={() => setFocusStatus(false)}
              value={search}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              className="focus:ring-0"
            />
            <Button className="text-sm">Send a friend request</Button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full">
        <Divider className="pb-2" />
        <EmptyBox
          src="/not-found.svg"
          text="Wumpus wait for a friends."
          alt="wumpus"
        />
      </div>
    </div>
  );
}
