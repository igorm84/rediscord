"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import HybridButton from "@/components/ui/hybrid/hybrid-button";
import { IoMdStarOutline } from "react-icons/io";
import Link from "next/link";
import clsx from "@/lib/clsx";
import { signIn } from "next-auth/react";
import { Loader2, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthButton from "./auth-button";

const schema = z.object({
  emailOrPhone: z.string().email().or(z.string().min(10).max(10)),
  password: z.string().min(8).max(20),
});

type FormState = z.infer<typeof schema>;

function validatePhoneNumberField(
  value: string,
  onChange: (v: string) => void,
) {
  if (value.includes("@") && value[0] === "+") {
    return onChange(value.slice(1));
  }
  if (!isNaN(+value[0]) && !value.includes("@") && value[0] !== "+") {
    onChange("+" + value);
  } else {
    onChange(value);
  }
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormState>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: FormState) => {
      const response = await signIn("credentials", {
        emailOrPhone: data.emailOrPhone,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        return true;
      } else {
        toast.error(response?.error || "Something went wrong");
        throw new Error();
      }
    },
    onSuccess: (data) => {
      data && router.push("/");
    },
  });

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="grid gap-5 rounded-lg bg-foreground p-8 text-[#B9BBBE] shadow-lg"
      >
        <div className="grid gap-2 text-center">
          <h4 className="text-2xl font-normal leading-8 text-white">
            Welcome back!
          </h4>
          <p className="leading-6">We're so exited to see you again</p>
        </div>
        <div className="grid gap-2 text-xs">
          <label
            className={clsx(
              "input-label",
              errors.emailOrPhone && "input-label-error",
            )}
            htmlFor="email-or-phone"
          >
            {errors.emailOrPhone
              ? errors.emailOrPhone.message
              : "Email or phone number"}
            <IoMdStarOutline className="text-[8px] text-red-600" />
          </label>
          <Controller
            name="emailOrPhone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                size="md"
                className={clsx("bg-[#202225]")}
                type="text"
                state={errors.emailOrPhone ? "error" : "normal"}
                onChange={(e) =>
                  validatePhoneNumberField(e.target.value, field.onChange)
                }
              />
            )}
          />
          <label
            className={clsx(
              "input-label pt-3",
              errors.password && "input-label-error",
            )}
            htmlFor="password"
          >
            {errors.password ? errors.password.message : " Password"}
            <IoMdStarOutline className="text-[8px] text-red-600" />
          </label>
          <Input
            {...register("password")}
            type="password"
            size="md"
            className={clsx("bg-[#202225]")}
            state={errors.password ? "error" : "normal"}
            id="password"
          />
          <Link
            href="/forgotPassword"
            className="max-w-[max-content] text-sm text-[#00AFF4]"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="grid gap-3">
          <AuthButton pending={mutation.isPending} success={mutation.isSuccess}>
            Log In
          </AuthButton>
          <span className="text-sm">
            Need an account?{" "}
            <Link href="/signUp" className="text-[#00AFF4]">
              Register
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
