import updateUserProfile from "@/app/(actions)/user-settings/updateUserProfile";
import fileToDataUrl from "@/lib/utils/fileToDataURL";
import { Prisma } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect,  useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

export type FullUserInfo = Omit<
  Prisma.AccountGetPayload<{
    include: {
      user: true;
    };
  }>,
  "password"
>;

export default function useUserSettingsData() {
  const queryClient = useQueryClient();
  const [avatar, setAvatar] = useState<string | null>(null);
  const { update, data: session } = useSession();
  const updatedUserInfo = queryClient.getQueryData<FullUserInfo>([
    "user-info",
    session?.user?.id,
  ]);
  const [formState, action] = useFormState(updateUserProfile, null);

  const editAvatarHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      await fileToDataUrl(file, (url) => setAvatar(url));
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formState?.ok && formState?.data) {
      queryClient.setQueryData(["user-info", session?.user?.id], {
        user: { ...formState?.data?.user! },
        ...formState?.data?.account!,
      });

      (async function () {
        await update({ user: formState?.data?.user });
      })();
    }
  }, [formState]);

  return {
    avatar: {
      image: avatar,
      setAvatar,
    },
    userInfo: updatedUserInfo,
    form: {
      state: formState,
      action,
    },
    editAvatarHandler,
    session
  };
}
