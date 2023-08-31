"use client";
import { useEffect, useState } from "react";

const RediscordWaves = ({ className }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 386 160"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M87.4407 117.699C6.18901 117.699 -30.0685 160 -30.0685 160L-34 -13H412.447L419 160C419 160 368.495 116.965 318.091 117.699C279.605 118.259 264.39 139.628 225.918 141.019C181.774 142.615 168.692 117.699 87.4407 117.699Z"
      fill="currentColor"
    />
  </svg>
);
export default function LoginHeader() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const posf = 3;
    const x = (window.innerWidth - event.pageX * posf) / 90;
    const y = (window.innerHeight - event.pageY * posf) / 90;

    setPosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative rounded-t-lg px-20 pb-16 pt-8 text-center">
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="absolute -left-6 -top-6 w-full"
      >
        <RediscordWaves className="text-primary-muted/50 absolute left-0 top-0 w-[120%]" />
      </div>
      <RediscordWaves className="text-primary-muted absolute -top-4 left-0 z-10 repeat-infinite" />
      <h1 className="relative z-30 text-2xl font-bold">
        <span className="-ml-4 text-base font-semibold">Sign in</span> ReDiscord
      </h1>
    </div>
  );
}
