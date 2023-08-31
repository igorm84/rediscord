"use client";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input/input-field";
import ProvidersButtons from "./providers-buttons";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import clsx from "@/lib/clsx";
import Label from "../ui/input/label";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <form
      className={clsx(
        loading && "pointer-events-none animate-pulse opacity-30",
      )}
    >
      <Label>Username</Label>
      <InputField>
        <Input
          placeholder="Your username"
          type="text"
          size="none"
          className="bg-black px-4 py-2"
          bg="none"
        />
      </InputField>

      <div className="mt-4">
        <Label>Password</Label>
        <InputField
          endIcon={
            <button type="button" onClick={() => setShowPass((prev) => !prev)}>
              <BsEyeSlash className={showPass ? "block" : "hidden"} />
              <BsEye className={showPass ? "hidden" : "block"} />
            </button>
          }
        >
          <Input
            placeholder="Your password"
            type={showPass ? "text" : "password"}
            size="none"
            className="bg-black px-4 py-2"
            bg="none"
          />
        </InputField>
      </div>
      <Button className="mt-8 w-full">Sign in</Button>
      <div className="w-full max-w-xs">
        <ProvidersButtons setLoading={setLoading} />
      </div>
    </form>
  );
}
