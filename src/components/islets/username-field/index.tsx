import Field from "@/components/ui/input/field";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useDebounce } from "@/state/hooks/use-debouce";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/db/database.types";
import LoadingIcon from "@/components/ui/icon/loading-icon";
import { MIN_USERNAME_LENGTH, profileSchema } from "@/lib/validation/profile";

interface UsernameFieldProps {
  value: string;
  currentUsername?: string | null;
  onChange: (value: string) => void;
  error?: React.ReactNode;
}

const isValidUsername = (username: string) => {
  return profileSchema.shape.username.safeParse(username).success;
};
export default function UsernameField({
  currentUsername,
  value,
  onChange,
  error,
}: UsernameFieldProps) {
  const [availabilityData, setAvailabilityData] = React.useState<{
    username?: string;
    status: "available" | "unavailable" | "error";
  } | null>(null);
  const debouncedValue = useDebounce<string>(value, 500);
  const supabase = createClientComponentClient<Database>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const isValid = isValidUsername(value);

  useEffect(() => {
    (async () => {
      if (isValidUsername(debouncedValue)) {
        if (debouncedValue === availabilityData?.username) return;
        const { data: isAvailable, error } = await supabase.rpc(
          "is_username_available",
          {
            new_username: debouncedValue,
          },
        );

        if (error) {
          setAvailabilityData({ status: "error" });
        } else {
          setAvailabilityData({
            username: debouncedValue,
            status: isAvailable ? "available" : "unavailable",
          });
        }
      }
    })();
  }, [availabilityData?.username, debouncedValue, onChange, supabase]);

  const renderAvailabilityStatus = () => {
    if (value.length < MIN_USERNAME_LENGTH) {
      return "Your username is unique, belongs only to you";
    }
    if (value === currentUsername) {
      return "This is your current username, feel free to change it";
    }
    if (availabilityData?.username !== value) {
      return (
        <span className="text-gray-400">
          <LoadingIcon className="mr-1" />
          Checking username availability...
        </span>
      );
    }
    if (availabilityData?.status === "available") {
      return (
        <span className="text-green-500">
          Your username <strong>{availabilityData.username}</strong> is
          available
        </span>
      );
    }

    if (availabilityData?.status === "unavailable") {
      return (
        <span className="text-red-500">
          The username <strong>{availabilityData.username}</strong> is already
          been taken
        </span>
      );
    }

    if (availabilityData?.status === "error") {
      return (
        <span className="text-gray-500">
          Error when fetching the username, try submiting the form
        </span>
      );
    }
  };

  return (
    <Field
      className="mt-4"
      help={renderAvailabilityStatus()}
      error={
        value.length >= MIN_USERNAME_LENGTH
          ? !isValid && "Username can contains only alphanumeric and _"
          : error || null
      }
      label="username"
      required
    >
      <Input
        placeholder="Your username"
        value={value}
        onChange={handleChange}
      />
    </Field>
  );
}
