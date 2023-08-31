import clsx from "@/lib/clsx";

export default function Label({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={clsx(
        "text-xs font-semibold uppercase text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
