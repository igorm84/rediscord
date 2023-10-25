import Divider from "@/components/ui/divider";

interface DateBarProps {
  date: string;
}
export default function DateBar({ date }: DateBarProps) {
  return (
    <div className="flex h-1 items-center p-6 text-[11px] text-[#949BA4]">
      <Divider className="w-full" />
      <span className="whitespace-nowrap px-1">{date}</span>
      <Divider className="w-full" />
    </div>
  );
}
