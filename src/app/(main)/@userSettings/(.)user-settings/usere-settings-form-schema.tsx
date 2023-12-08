import { UpdateUserProfileSchema } from "@/app/(actions)/user-settings/updateUserProfile";
import { Prisma } from "@prisma/client";
import { HTMLInputTypeAttribute, PropsWithChildren } from "react";

type SchemaFieldsToRenderValue = {
  type: HTMLInputTypeAttribute;
  container?: (props: PropsWithChildren) => JSX.Element;
  labelText?: string;
  getDefaultValue?: (
    account: Omit<
      Prisma.AccountGetPayload<{ include: { user: true } }>,
      "password"
    >,
  ) => string;
  memberFields?: {
    [K in keyof UpdateUserProfileSchema]?: SchemaFieldsToRenderValue;
  };
};

type SchemaFieldsToRender = Omit<
  {
    [K in keyof UpdateUserProfileSchema]: SchemaFieldsToRenderValue;
  },
  "avatar"
>;

const schemaFieldsToRender: SchemaFieldsToRender = {
  email: {
    type: "email",
    labelText: "Your email",
    getDefaultValue: (account) => account?.email ?? "",
  },
  login: {
    type: "text",
    labelText: "Your login",
    getDefaultValue: (account) => account?.user?.username ?? "",
  },
  password: {
    type: "password",
    labelText: "Your password",
    getDefaultValue: () => "",
  },
  new_password: {
    type: "password",
    labelText: "New password",
    getDefaultValue: () => "",
  },
};
export default schemaFieldsToRender;
