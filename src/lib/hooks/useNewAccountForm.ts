import { type z } from "zod";
import { useFormWithLocalStorage } from "./useFormWithLocalStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import schema, {
  schemaFieldsToRender,
} from "@/components/islets/auth/new-account-form-schema";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FieldErrors } from "react-hook-form";
import signUp from "@/app/(actions)/auth/signUp";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type FormState = z.infer<typeof schema>;

const fieldKeys = Object.keys(schemaFieldsToRender);
export const STEP_COUNT = Math.ceil(fieldKeys.length / 2);
const fieldsPerStep = Math.ceil(fieldKeys.length / STEP_COUNT);

export default function useNewAccountForm() {
  const baseFormStep = Number(localStorage.getItem("formStep"));
  const { ...formData } = useFormWithLocalStorage<FormState>({
    resolver: zodResolver(schema),
  });
  const [formStep, setFormStep] = useState<number>(baseFormStep);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: FormState) => {
      const user = await signUp(data);
      if (user.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        toast.success("Account created successfully");
        return true;
      }
      throw new Error(toast.error(user.error as string));
    },
    onSuccess: (data) => {
      data && router.push("/");
    },
  });
  const currentKeys = useMemo(
    () =>
      fieldKeys.slice(formStep * fieldsPerStep, (formStep + 1) * fieldsPerStep),
    [formStep],
  );
  const moveToNextStepHandler = (errors: FieldErrors<FormState>) => {
    const errorKeys = Object.keys(errors);

    const isValidStep = !currentKeys.some((key) => {
      const members = schemaFieldsToRender[key].memberFields;
      if (members) {
        const memberKeys = Object.keys(members);
        return memberKeys.some((memberKey) => {
          if (errorKeys.includes(memberKey)) return true;
        });
      }
      return currentKeys.some((key) => {
        if (errorKeys.includes(key)) return true;
      });
    });

    const password = formData.watch("password");
    const repeatPassword = formData.watch("repeatPassword");
    const isMatch = password === repeatPassword;

    if (!isMatch) {
      return formData.setError("repeatPassword", {
        message: "Passwords do not match",
      });
    } else {
      formData.clearErrors("repeatPassword");
    }

    if (isValidStep && formStep + 1 !== STEP_COUNT) {
      setFormStep((v) => v + 1);
      formData.clearErrors();
    }
  };
  useEffect(() => {
    localStorage.setItem("formStep", formStep.toString());
    return () => localStorage.removeItem("formStep");
  }, [formStep]);

  return {
    formData,
    mutation,
    formStep,
    setFormStep,
    moveToNextStepHandler,
    fieldsPerStep,
    fieldKeys,
    currentKeys,
  };
}
