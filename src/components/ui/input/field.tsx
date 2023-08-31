import React from "react";
import Label from "./label";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
}

export default function Field({
  label,
  help,
  error,
  required,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={className} {...props}>
      {label && (
        <Label className="mb-1 block">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {children}
      {help && !error && (
        <div className="mt-1 text-xs text-gray-400">{help}</div>
      )}
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </div>
  );
}
