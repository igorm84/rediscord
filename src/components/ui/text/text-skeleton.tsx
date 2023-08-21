import clsx from "@/lib/clsx";

interface TextSkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  fontSize?: "xs" | "sm" | "md" | "lg";
  length?: number;
  place?: "foreground" | "midground" | "background";
}

export default function TextSkeleton({
  fontSize = "md",
  length,
  place = "foreground",
  className,
  ...props
}: TextSkeletonProps) {
  return (
    <span
      style={length ? { width: `${length}ch` } : {}}
      className={clsx(
        "inline-block select-none rounded-md",
        fontSize === "xs" && "h-3 text-xs",
        fontSize === "sm" && "h-3.5 text-sm",
        fontSize === "md" && "h-4",
        fontSize === "lg" && "h-5 text-lg",
        place === "foreground" && "bg-gray-800/50",
        place === "midground" && "bg-gray-700/40",
        place === "background" && "bg-gray-600/50",
        className,
      )}
      {...props}
    >
      &nbsp;
    </span>
  );
}
