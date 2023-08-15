import Link from "next/link";

export type HybridButtonProps =
  | React.ComponentProps<typeof Link>
  | React.HTMLAttributes<HTMLButtonElement>;

export default function HybridButton({ ...props }: HybridButtonProps) {
  return "href" in props ? <Link {...props} /> : <button {...props} />;
}
