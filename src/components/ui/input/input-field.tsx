import clsx from "@/lib/clsx";

interface InputFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export default function InputField({
  endIcon,
  startIcon,
  children,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className={clsx("relative", className)} {...props}>
      {children}
      {endIcon && (
        <div className="absolute inset-y-0 right-2.5 flex items-center text-gray-300">
          {endIcon}
        </div>
      )}
      {startIcon && (
        <div className="absolute inset-y-0 left-2.5 flex items-center text-gray-300">
          {startIcon}
        </div>
      )}
    </div>
  );
}
