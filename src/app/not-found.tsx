import Link from "next/link";
import { GiCow } from "react-icons/gi";
export default async function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="text-gray-300">
        <GiCow fontSize={62} />
      </div>
      <h1 className="text-2xl text-gray-400">Not found</h1>
      <h2 className="text-lg text-gray-500">
        Whooops! Couldn&apos;t find what you looking for
      </h2>
      <Link
        href="/me"
        className="py-4 text-sm text-gray-400 underline hover:text-gray-300"
      >
        Go back home
      </Link>
    </div>
  );
}
