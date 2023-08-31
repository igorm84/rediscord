"use client";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ProvidersButtons({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  const supabase = createClientComponentClient();

  return (
    <>
      <Button
        onClick={async () => {
          setLoading(true);
          await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: `${location?.origin}/auth/callback`,
            },
          });
        }}
        color="default"
        className="mt-6 flex w-full items-center justify-center gap-2"
      >
        <BsGithub />
        Sign in with GitHub
      </Button>
      <Button
        onClick={() => {
          supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}
        color="transparent"
        className="mt-2 flex w-full items-center justify-center gap-2 border-rose-700 bg-rose-700 hover:border-rose-600 hover:bg-rose-600"
      >
        <BsGoogle />
        Sign in with Google
      </Button>
    </>
  );
}
