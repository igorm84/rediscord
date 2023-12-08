"use server";

import prisma from "@/lib/prismaClient";
import { password } from "@/lib/schemas/auth";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import cloudinary from "cloudinary";
import authOptions from "@/lib/authOptions";

const schema = z.object({
  login: z.string().min(3).max(20).nullable(),
  email: z.string().email().nullable(),
  password: password.nullable(),
  new_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .nullable(),
  avatar: z.string().nullable(),
});

export type UpdateUserProfileSchema = z.infer<typeof schema>;
export type UpdateUserProfileResult = {
  ok: boolean;
  message: string | z.ZodIssue[];
  data?: {
    account: Omit<Prisma.AccountGetPayload<{}>, "password">;
    user?: Prisma.UserGetPayload<{}>;
  };
};

async function updateUserPassword({
  oldPassword,
  newPassword,
  accountId,
}: {
  oldPassword: string | null;
  newPassword: string | null;
  accountId: string | null;
}) {
  if (oldPassword && newPassword && accountId) {
    const currentUserPasswordHash = (
      await prisma.account.findUnique({
        where: {
          id: accountId,
        },
      })
    )?.password;

    const isCorrectPassword = bcrypt.compareSync(
      oldPassword,
      currentUserPasswordHash || "",
    );

    if (!isCorrectPassword) {
      throw new Error("Please enter your current password correctly!");
    }
    return prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        password: bcrypt.hashSync(newPassword, 10),
      },
    });
  } else if (newPassword && !oldPassword) {
    throw new Error("Please enter your current password!");
  }
  throw new Error("Something went wrong!");
}

async function updateUserAvatar(dataUrl: string, oldAvatarUrl?: string) {
  const { url } = await cloudinary.v2.uploader.upload(dataUrl, {
    resource_type: "image",
    folder: "avatars",
  });

  if (oldAvatarUrl) {
    // parse url to get public_id
    const oldAvatarId = oldAvatarUrl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    if (oldAvatarId) {
      await cloudinary.v2.uploader.destroy(oldAvatarId);
    }
  }

  return url;
}

export default async function updateUserProfile(
  previousState: UpdateUserProfileResult | null,
  formData: FormData,
): Promise<UpdateUserProfileResult> {
  try {
    const data = {
      login: formData.get("login") || null,
      email: formData.get("email") || null,
      password: formData.get("password") || null,
      new_password: formData.get("new_password") || null,
      avatar:
        typeof formData.get("avatar") === "string"
          ? formData.get("avatar")
          : null,
    };

    const parsedData = schema.parse(data);
    const session = await getServerSession(authOptions);

    // --- updating user data ---
    const userDataToUpdate: Prisma.UserUpdateInput = {
      username: parsedData.login ?? undefined,
    };

    if (parsedData.avatar) {
      const oldAvatarUrl = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
        select: {
          avatar: true,
        },
      });
      const avatarUrl = await updateUserAvatar(
        parsedData.avatar,
        oldAvatarUrl?.avatar!,
      );
      userDataToUpdate.avatar = avatarUrl;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: userDataToUpdate,
    });

    // --- updating account data ---
    if (parsedData.new_password) {
      await updateUserPassword({
        oldPassword: parsedData.password,
        newPassword: parsedData.new_password,
        accountId: session?.user?.accountId || "",
      });
    }

    const updatedAccount = await prisma.account.update({
      where: {
        id: session?.user?.accountId,
      },
      data: {
        email: parsedData.email ?? undefined,
      },
    });

    const { password: _, ...accountWithoutPassword } = updatedAccount;
    return {
      ok: true,
      message: "",
      data: {
        account: accountWithoutPassword,
        user: updatedUser,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.issues,
      };
    }
    return {
      ok: false,
      message: (error as Error).message,
    };
  }
}
