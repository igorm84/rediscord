"use client";
import React from "react";
import Button from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import clsx from "@/lib/clsx";
import {
  SendFriendRequestResult,
  useFriendRequestStore,
} from "@/state/friendRequest-list";

export default function AddFriend() {
  const sendRequest = useFriendRequestStore((state) => state.sendRequest);
  const [username, setUsername] = React.useState("");
  const [result, setResult] = React.useState<SendFriendRequestResult | null>(
    null,
  );
  const inputId = React.useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sendResult = sendRequest(username);
    setResult(sendResult);
    if (sendResult.ok) setUsername("");
  };

  return (
    <div className="px-2">
      <h2 className="text-base font-semibold uppercase text-gray-100">
        Add Friend
      </h2>
      <label htmlFor={inputId} className="mt-1 block text-sm text-gray-400">
        You can add friends with their username.
      </label>
      <form className="mt-4" onSubmit={handleSubmit}>
        <InputField
          endIcon={
            <Button
              type="submit"
              disabled={!username.trim()}
              className="!my-0 !py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Friend Request
            </Button>
          }
        >
          <Input
            id={inputId}
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setResult(null);
            }}
            placeholder="Enter a username"
            autoComplete="off"
            className="py-3 pr-52"
          />
        </InputField>
        <p
          aria-live="polite"
          className={clsx(
            "mt-2 min-h-5 text-sm",
            result?.ok ? "text-green-400" : "text-red-400",
          )}
        >
          {result?.message}
        </p>
      </form>
    </div>
  );
}
