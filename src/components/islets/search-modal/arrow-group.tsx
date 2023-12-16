import clsx from "@/lib/clsx";
import Image from "next/image";
interface ArrowGroupProps {
  yPosition: number;
  active: boolean;
}
export default function ArrowGroup({ yPosition, active }: ArrowGroupProps) {
  const containerClassName = `absolute grid items-center top-0 h-[31px] 
        transition-all duration-200 ease-linear`;
  const imageClassName = "animate-[arrow-pulse_.8s_ease-in-out_infinite]";
  return (
    <>
      <div
        className={clsx(
          containerClassName,
          "right-[-54px]",
          !active && "opacity-0",
        )}
        style={{
          transform: `translateY(${yPosition}px) rotate(180deg)`,
        }}
      >
        <Image
          src="/arrow.svg"
          width={42}
          height={18}
          className={imageClassName}
          alt="arrow"
        />
      </div>
      <div
        className={clsx(
          containerClassName,
          "left-[-54px]",
          !active && "opacity-0",
        )}
        style={{ transform: `translateY(${yPosition}px)` }}
      >
        <Image
          src="/arrow.svg"
          width={42}
          height={18}
          className={imageClassName}
          alt="arrow"
        />
      </div>
    </>
  );
}
