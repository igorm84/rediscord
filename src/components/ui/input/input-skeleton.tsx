import clsx from "@/lib/clsx";

interface InputSkeletonProps {
  size?: "sm" | "md" | "lg";
}
export default function InputSkeleton({ size = "md" }: InputSkeletonProps) {
  return (
    <div
      className={clsx(
        "w-full select-none rounded-md bg-gray-800/50",
        size === "sm" && "px-1.5 py-1.5 text-sm",
        size === "md" && "px-2.5 py-1.5 text-base",
        size === "lg" && "px-4 py-5 text-lg",
      )}
    >
      &nbsp;
    </div>
  );
}
