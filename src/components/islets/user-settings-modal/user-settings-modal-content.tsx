"use client";

import Image from "next/image";
import { ComponentProps, memo, useRef } from "react";
import { UpdateUserProfileResult } from "@/app/(actions)/user-settings/updateUserProfile";
import Input from "@/components/islets/auth/input";
import SlidingButton from "@/components/ui/button/with-sliding-content";
import clsx from "@/lib/clsx";
import { Edit2, Settings as SettingsIcon, X } from "lucide-react";
import AvatarEditor from "@/components/islets/avatar-editor";
import useUserSettingsData, {
  FullUserInfo,
} from "@/lib/hooks/user-settings/useUserSettingsData";
import useUserSettingsFieldsData from "@/lib/hooks/user-settings/useUserSettingsFieldsData";
import { MediaQuery } from "@/components/providers/MediaQuery";

interface UserSettingsModalFormFieldsProps {
  userInfo: FullUserInfo;
  formState: UpdateUserProfileResult | null;
}
interface UserSettingsModalContentProps {
  modal?: boolean;
}

export default function UserSettingsModalContent({
  modal,
}: UserSettingsModalContentProps) {
  const { avatar, form, editAvatarHandler, userInfo, session } =
    useUserSettingsData();

  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <form id="user-settings" action={form.action}>
      <AvatarEditor
        open={!!avatar.image}
        setOpen={(v) => !v && avatar.setAvatar(null)}
        avatar={avatar.image!}
      />
      {modal && (
        <div className="absolute left-0 top-0 h-[64px] w-full rounded-t-lg bg-foreground"></div>
      )}
      <div
        className={clsx(
          "relative flex items-end justify-between",
          "pb-4 pl-12 pr-4 sm:pl-[90px]",
          modal ? "pt-12" : "pt-4",
        )}
      >
        <div
          onClick={() => avatarInputRef.current?.click()}
          className={clsx(
            "group/avatar absolute left-0",
            " h-[50px] w-[50px] cursor-pointer rounded-full",
            "border-[8px] border-midground",
            "p-2 sm:top-4 sm:h-20 sm:w-20",
            modal ? "top-[40%] sm:top-4" : 
            "top-[10%] sm:top-[-10px]"
          )}
        >
          <Image
            src={
              session?.user?.avatar ||
              "https://avatars.githubusercontent.com/u/16727448?v=4"
            }
            className={
              "rounded-full transition-all hover:brightness-50 hover:filter"
            }
            fill
            alt="avatar"
          />
          <SettingsIcon
            className="pointer-events-none absolute left-[50%] top-[50%] 
          translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover/avatar:opacity-100"
          />
          <input
            name="avatar"
            ref={avatarInputRef}
            onChange={editAvatarHandler}
            type="file"
            className="hidden"
          />
        </div>
        <p className="fonts-semibold text-xl ml-2 sm:ml-0">@{userInfo?.user?.username}</p>
        <button
          form="user-settings"
          type="submit"
          className={clsx(
            "rounded-md  bg-primary px-1 py-1",
            "text-sm font-semibold text-white",
            "overflow-hidden text-ellipsis whitespace-nowrap",
          )}
        >
          Update profile
        </button>
      </div>
      <UserSettingsModalFormFields
        formState={form.state}
        userInfo={userInfo!}
      />
    </form>
  );
}
const UserSettingsModalFormFields = memo(
  ({ userInfo, formState }: UserSettingsModalFormFieldsProps) => {
    const {
      fieldKeys,
      fieldsSchema,
      fieldsToEdit,
      formStatus,
      handleEditField,
    } = useUserSettingsFieldsData(formState);
    return (
      <div className="mt-4 rounded-xl bg-foreground p-2">
        <div className="flex flex-col gap-4 p-4">
          {fieldKeys.map((k) => {
            const key = k as keyof typeof fieldsSchema;
            const input = fieldsSchema[key];
            const isEditing = fieldsToEdit.includes(key);
            const defaultValue = input?.getDefaultValue?.(userInfo!) ?? "";
            const errorMessage =
              Array.isArray(formState?.message) &&
              formState?.message?.find((m) => m.path.includes(key))?.message;
            const editButtonProps: ComponentProps<typeof SlidingButton> = {
              type: "button",
              onClick: () => handleEditField(key),
              className: clsx(
                "rounded-md bg-gray-200 bg-opacity-30 px-1 py-2 text-sm",
                "font-semibold text-white transition-all hover:bg-gray-700",
                "whitespace-nowrap",
                formStatus.pending && "animate-pulse",
              ),
              disabled: formStatus.pending,
            };
            return (
              <div
                className="flex h-[50px] items-end justify-between"
                key={key}
              >
                <div className="grid">
                  <label
                    className={clsx(
                      "whitespace-nowrap text-xs font-semibold uppercase text-gray-200",
                      "text-ellipsis",
                      errorMessage && isEditing && "input-label-error",
                      formStatus.pending && "animate-pulse",
                    )}
                  >
                    {(isEditing && errorMessage) || input?.labelText}
                  </label>
                  {!isEditing && (
                    <p
                      className={clsx(
                        "h-9 overflow-hidden text-ellipsis py-[6px] font-[500] text-white",
                        formStatus.pending && "animate-pulse",
                      )}
                    >
                      {defaultValue || <b>"NOT SET"</b>}
                    </p>
                  )}
                  {isEditing && (
                    <Input
                      type={input?.type}
                      name={key}
                      required={false}
                      renderLabel={false}
                      inputStatus={errorMessage ? "error" : "normal"}
                      defaultValue={defaultValue}
                      disabled={formStatus.pending}
                      className={clsx(
                        "rounded-md border-midground mt-2",
                        formStatus.pending && "animate-pulse",
                      )}
                    />
                  )}
                </div>
                <div className="grid items-end justify-end">
                  <MediaQuery
                    query="(max-width:768px)"
                    component={
                      <SlidingButton
                        {...{
                          ...editButtonProps,
                          className: clsx(editButtonProps.className, "px-2"),
                        }}
                      >
                        {isEditing ? <X /> : <Edit2 />}
                      </SlidingButton>
                    }
                  />
                  <MediaQuery
                    query="(min-width:768px)"
                    component={
                      <SlidingButton {...editButtonProps}>
                        {isEditing ? "Cancel editing" : "Edit current"}
                      </SlidingButton>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
