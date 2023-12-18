import clsx from "@/lib/clsx";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid gap-4 text-center">
        <div
          className={clsx(
            "mx-auto grid min-h-[162px]  grid-cols-[minmax(0,376px)]",
            "bg-[url('/not-found.svg')]",
            "bg-contain bg-center bg-no-repeat",
          )}
        />
        <span className="text-gray-400">
          Your request does not give a result :{"("}
        </span>
      </div>
    </div>
  );
}
