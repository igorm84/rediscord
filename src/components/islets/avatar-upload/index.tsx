import Avatar from "@/components/ui/avatar";
import Field from "@/components/ui/input/field";
import { useCurrentUserStore } from "@/state/user";
import { useState } from "react";

export default function AvatarUpload() {
  const { currentUser } = useCurrentUserStore();
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.currentTarget?.files?.[0];
    if (file) {
      setUploadedAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <Field
      help="Send us your nice photo (is it AI generated?)"
      className="py-2 text-center"
    >
      <label htmlFor="avatarInput" className="cursor-pointer">
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ height: 0, width: 0, opacity: 0 }}
        />
        <Avatar
          size="xl"
          alt="avatar"
          src={currentUser?.avatar || uploadedAvatar}
          loading={loading}
        />
      </label>
    </Field>
  );
}
