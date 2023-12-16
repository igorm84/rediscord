import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import clsx from "@/lib/clsx";
import debounce from "@/lib/utils/debounce";
import Image from "next/image";
import { useCallback, useState } from "react";

interface SearchModalHeaderProps {
  arrowBgActive?: boolean;
  setFilterValue: (s: string) => void;
}
function ArrowItem({
  containerClassName,
  className,
}: {
  containerClassName?: string;
  className?: string;
}) {
  const animClassName = "animate-[arrow-pulse_.8s_ease-in-out_infinite]";
  return (
    <div className={clsx("absolute transition-all", containerClassName)}>
      <Image
        width={42}
        height={18}
        className={clsx(className, animClassName)}
        src="/arrow.svg"
        alt="arrow"
      />
    </div>
  );
}
function ArrowsPointerBg({ active }: { active: boolean }) {
  const elementClassNames = [
    "top-[-3px] left-[-74px] rotate-[25deg]",
    "top-[-40px] left-[-62px] rotate-[45deg]",
    "top-[-56px] left-[-30px] rotate-[65deg]",
    "top-[-56px] right-[-30px] rotate-[115deg]",
    "top-[-40px] right-[-62px] rotate-[135deg]",
    "top-[-3px] right-[-74px] rotate-[155deg]",
  ];
  return (
    <>
      {elementClassNames.map((className, idx) => (
        <ArrowItem
          key={idx}
          containerClassName={clsx(className, !active && "opacity-0")}
        />
      ))}
    </>
  );
}
export default function SearchModalHeader({
  setFilterValue,
  arrowBgActive,
}: SearchModalHeaderProps) {
  const [value, setValue] = useState("");
  const changeFilterValue = useCallback(
    debounce((v: string) => {
      setFilterValue(v);
    }),
    [],
  );
  return (
    <DialogHeader className="relative">
      <div
        className={clsx(
          "absolute -top-20 grid w-full justify-center transition-all",
          !arrowBgActive && "opacity-0",
        )}
      >
        <span className="animate-pulse text-2xl font-semibold">
          START TYPING
        </span>
      </div>
      <ArrowsPointerBg active={!!arrowBgActive} />
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          changeFilterValue(e.currentTarget.value);
        }}
        placeholder="Where you want me to take you?"
        size="lg"
      />
    </DialogHeader>
  );
}
