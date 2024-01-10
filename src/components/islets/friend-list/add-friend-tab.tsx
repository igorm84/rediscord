"use client"

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Button from "@/components/ui/button";
import clsx from "@/lib/clsx";
import { EmptyBox } from "../empty-box-image";
import Divider from "@/components/ui/divider";
import { useFormState } from "react-dom";
import sendFriendRequest, {
  FriendRequestState,
} from "@/app/(actions)/general/sendFriendRequest";

export default function AddFriendTab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setFocusStatus] = useState(false);
  const [search, setSearchValue] = useState("");
  const [state, action] = useFormState(sendFriendRequest, {
    status: "normal",
    message: "",
  } as FriendRequestState);

  return (
    <form action={action} className="flex w-full flex-col gap-4">
      <div className="grid items-start">
        <div className="grid gap-2">
          <p className="text-[16px] uppercase">Add friend</p>
          <p className="text-gray-400">
            Here you can add friend by his username
          </p>
          <div
            className={clsx(
              "relative grid w-full grid-cols-[1fr_max-content] items-center",
              "justify-between rounded-md",
              "bg-background px-3 py-1",
              "min-h-[50px]",
              isFocus && state.status === "normal" && "ring-2 ring-blue-500",
              state.status === "error" &&
                "ring-2 ring-red-500 focus:ring-2 focus:ring-red-500",
              state.status === "success" &&
                "ring-2 ring-green-500 focus:ring-2 focus:ring-green-500",
            )}
          >
            <Input
              ref={inputRef}
              onFocus={() => setFocusStatus(true)}
              onBlur={() => setFocusStatus(false)}
              value={search}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              name="username"
              className="focus:ring-0"
            />
            <Button type="submit" className="text-sm max-w-max px-4">
              Send request
            </Button>
          </div>
          {state.message && (
            <span
              className={clsx(
                "pt-1 text-sm font-bold",
                state.status === "success" && "text-green-500",
                state.status === "error" && "text-red-500",
              )}
            >
              {state.message}
            </span>
          )}
        </div>
      </div>
      <div className="mx-auto w-full">
        <Divider className="mb-2" />
        <EmptyBox
          src="/not-found.svg"
          text="Wumpus wait for a friends."
          alt="wumpus"
        />
      </div>
    </form>
  );
}