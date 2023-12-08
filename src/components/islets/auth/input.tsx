import clsx from "@/lib/clsx";
import { Input as InputDefault } from "@/components/ui/input";
import { IoMdStarOutline } from "react-icons/io";
import { HTMLInputTypeAttribute, forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  renderLabel?: boolean;
  inputStatus?: "normal" | "error" | "success";
  labelText?: string;
  required?: boolean;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      errorMessage,
      inputStatus,
      renderLabel = true,
      labelText,
      required = true,
      size,
      ...props
    }: InputProps,
    ref,
  ) => {
    const isError = inputStatus === "error";
    return (
      <div className="grid gap-2">
        {renderLabel && (
          <label
            className={clsx("input-label pt-3", isError && "input-label-error")}
          >
            {isError ? errorMessage : labelText}
            {required && <IoMdStarOutline className="text-[8px] text-red-600" />}
          </label>
        )}

        <InputDefault
          ref={ref}
          size={"md"}
          className={clsx("bg-[#202225]")}
          state={isError ? "error" : "normal"}
          {...props}
        />
      </div>
    );
  },
);
export default Input;
