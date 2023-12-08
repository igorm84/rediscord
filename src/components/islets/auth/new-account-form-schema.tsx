import { SelectWithTrigger } from "@/components/ui/select";
import {
  type FC,
  type HTMLInputTypeAttribute,
  type PropsWithChildren,
} from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";
import ValidPasswordStep from "./valid-password-step";
import { password } from "@/lib/schemas/auth";

const schema = z.object({
  login: z
    .string({ required_error: "Login is required" })
    .min(3)
    .max(20)
    .describe("Enter an username"),
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .describe("Enter an email"),
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => {
        if (!phone) return true;
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return phoneRegex.test(phone);
      },
      { message: "Invalid phone number" },
    )
    .describe("Enter a phone number"),
  birthDay: z
    .string()
    .refine(
      (day) => {
        const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/;
        return dayRegex.test(day);
      },
      {
        message: "Invalid day",
      },
    )
    .describe("DD"), // same group
  birthMonth: z
    .string()
    .refine(
      (month) => {
        const monthRegex = /^(0?[1-9]|1[0-2])$/;
        return monthRegex.test(month);
      },
      {
        message: "Invalid month",
      },
    )
    .describe("MM"), // same group
  birthYear: z
    .string()
    .refine(
      (year) => {
        const yearRegex = /^(19[0-9]{2}|200[0-9]|202[0-4])$/;
        return yearRegex.test(year);
      },
      {
        message: "Invalid year",
      },
    )
    .describe("YYYY"), // same group
  password: password.describe("Enter a password"),
  repeatPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .describe("Repeat password"),
  description: z.string().describe("Enter a description").optional(),
  gender: z
    .string()
    .refine((v) => {
      const genderRegex = /^(male|female|other)$/i;
      return genderRegex.test(v);
    })
    .describe("Please enter your gender")
    .optional(),
});

export default schema;

type SchemaKeys = keyof z.infer<typeof schema>;

interface SchemaFieldsToRenderValue {
  container?: FC<{
    control: Control<z.infer<typeof schema>>;
    name: SchemaKeys;
    watch: UseFormWatch<z.infer<typeof schema>>;
    setError: UseFormSetError<z.infer<typeof schema>>;
    errors: FieldErrors<z.infer<typeof schema>>;
    clearErrors: UseFormClearErrors<z.infer<typeof schema>>;
    children: React.ReactNode;
  }>;
  memberFields?: {
    [K in SchemaKeys]?: SchemaFieldsToRenderValue;
  };
  type: HTMLInputTypeAttribute;
}

type SchemaFieldsToRender = {
  [K in SchemaKeys]?: SchemaFieldsToRenderValue;
} & {
  [key: string]: SchemaFieldsToRenderValue;
};

export const schemaFieldsToRender: SchemaFieldsToRender = {
  password: {
    type: "password",
    container: ({ children, watch = (s: string) => "" }) => (
      <div className="flex max-h-[max-content] flex-col gap-2">
        {children}
        <ValidPasswordStep
          passwordSchema={schema.shape.password as unknown as z.ZodString}
          password={watch("password")?.toString()}
        />
      </div>
    ),
  },
  repeatPassword: {
    type: "password",
  },
  email: {
    type: "email",
  },
  birth: {
    type: "group",
    container: ({ children }: PropsWithChildren) => (
      <div className="grid grid-cols-3 gap-2">{children}</div>
    ),
    memberFields: {
      birthDay: {
        type: "number",
      },
      birthMonth: {
        type: "number",
      },
      birthYear: {
        type: "number",
      },
    },
  },
  gender: {
    type: "select",
    container: ({ control }) => (
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <SelectWithTrigger
            triggerText={"Select a gender"}
            onValueChange={field.onChange}
            defaultValue={"male"}
            selectItems={["male", "female", "other"]}
          />
        )}
      />
    ),
  },

  phone: { type: "tel" },

  login: { type: "text" },
  description: { type: "text" },
};
