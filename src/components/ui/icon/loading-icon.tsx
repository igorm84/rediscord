import clsx from "@/lib/clsx";
import { BiLoaderAlt } from "react-icons/bi";
export default function LoadingIcon({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children">) {
  return (
    <BiLoaderAlt
      className={clsx("inline-block animate-spin", className)}
      {...props}
    />
  );
}
