"use client";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Field from "@/components/ui/input/field";
import { useCurrentUserStore } from "@/state/user";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UsernameField from "../username-field";
import { toast } from "react-hot-toast";
import { profileSchema } from "@/lib/validation/profile";
import { useState } from "react";
import clsx from "@/lib/clsx";
import AvatarUpload from "../avatar-upload";

const validationSchema = profileSchema.pick({
  display_name: true,
  username: true,
});
type ValidationSchema = z.infer<typeof validationSchema>;

export default function UserRequiredDialog() {
  const { currentUser, updateCurrentUser, logout } = useCurrentUserStore();
  const [loading, setLoading] = useState(false);

  const shouldFillInfo =
    !currentUser?.display_name ||
    !currentUser?.username ||
    !currentUser?.updated_at;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      display_name: currentUser?.display_name || "",
      username: currentUser?.username || "",
    },
  });

  const onSubmit = async (data: ValidationSchema) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Your profile was updated, thanks!");
        updateCurrentUser({
          ...data,
          updated_at: new Date().toISOString(),
        });
      } else {
        toast.error("Verify your data and try again");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    currentUser && (
      <Dialog open={shouldFillInfo}>
        <DialogContent className="max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx(
              loading && "pointer-events-none animate-pulse opacity-30",
            )}
          >
            <DialogHeader>
              <Image
                alt="castle"
                width={350}
                height={350}
                className="absolute -top-44 left-1/2 ml-[-160px]"
                src="/halloween/pumpkin.svg"
              />
              <div className="text-center">
                <h1>Complete your profile</h1>
                <div className="mx-auto max-w-xs text-xs text-gray-500">
                  just some more burocratic stuff... sorry, we wish AI could
                  fill this automatically
                </div>
              </div>
            </DialogHeader>
            <div className="px-6">
              <AvatarUpload />
              <Field
                className="mt-4"
                label="name"
                error={errors.display_name?.message}
                required
              >
                <Input
                  placeholder="Your name"
                  {...register("display_name", { required: true })}
                />
              </Field>
              <UsernameField
                currentUsername={currentUser.username}
                value={watch("username")}
                onChange={(value) => {
                  setValue("username", value);
                }}
                error={errors.username?.message}
              />
            </div>
            <DialogFooter>
              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                  }}
                  className="px-4 text-xs text-gray-500"
                >
                  Sign out
                </button>
                <Button type="submit">Submit</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
