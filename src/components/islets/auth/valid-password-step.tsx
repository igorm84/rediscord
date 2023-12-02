import clsx from "@/lib/clsx";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ZodError, type ZodString } from "zod";

interface ValidPasswordStepProps {
  passwordSchema: ZodString;
  password: string;
}
export default function ValidPasswordStep({
  passwordSchema,
  password,
}: ValidPasswordStepProps) {
  const allErrorsMessages = useRef<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    try {
      passwordSchema.parse("");
    } catch (err) {
      if (err instanceof ZodError) {
        allErrorsMessages.current = err.issues
          .filter((issue) => issue.code === "custom")
          .map((issue) => issue.message);
      }
    }
  }, []);

  useEffect(() => {
    try {
      passwordSchema.parse(password);
      setErrors([]);
    } catch (err) {
      if (err instanceof ZodError) {
        const errorsMessages = err.issues
          .filter((issue) => issue.code === "custom")
          .map((issue) => issue.message);

        setErrors(errorsMessages);
      }
    }
  }, [password]);

  return (
    <div className="inline-flex flex-col gap-1">
      {allErrorsMessages.current?.map((err) => {
        const isDone = !errors?.includes(err) && password?.length;
        return (
          <div className="flex items-center gap-1">
            {isDone ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-red-500" />
            )}
            <p
              key={err}
              className={clsx(
                "relative max-w-[max-content] font-bold transition-all duration-200 ease-in-out",
                isDone ? "text-green-500" : "text-red-600",
              )}
            >
              {err}
              <span
                className={clsx(
                  "absolute left-0 top-[8px] h-[2px] bg-green-600 transition-all duration-200 ease-in-out",
                  isDone ? "w-full" : "w-0",
                )}
              ></span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
