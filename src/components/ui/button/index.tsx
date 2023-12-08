import HybridButton from "@/components/ui/hybrid/hybrid-button";
import clsx from "@/lib/clsx";
import { Check, Loader2 } from "lucide-react";

interface AuthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  pending?: boolean;
  success?: boolean;
  type?: "submit" | "button";
}

export default function AuthButton({
  pending,
  success,
  children,
  type = "submit",
  className,
  ...props
}: AuthButtonProps) {
  return (
    <HybridButton
      type={type}
      className={clsx(
        `grid grid-flow-col items-center justify-center 
          rounded-sm bg-[#5865F2] py-2 text-white transition-all hover:scale-95`,
        className,
      )}
      disabled={pending || success}
      {...props}
    >
      {pending && <Loader2 className="mr-2 animate-spin transition-all" />}
      {success && (
        <Check className="mr-2 animate-[pulse-rotate] transition-all" />
      )}
      {children}
    </HybridButton>
  );
}
