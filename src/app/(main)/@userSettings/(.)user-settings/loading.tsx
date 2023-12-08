import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
