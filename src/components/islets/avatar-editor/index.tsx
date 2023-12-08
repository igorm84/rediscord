import updateUserProfile from "@/app/(actions)/user-settings/updateUserProfile";
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import Editor from "react-avatar-editor";
import toast from "react-hot-toast";

interface AvatarEditorProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  avatar: string;
}

export default function AvatarEditor({
  avatar,
  open,
  setOpen,
}: AvatarEditorProps) {
  const { update, data: session } = useSession();
  const editorRef = useRef<Editor>(null);
  const saveImage = async () => {
    const croppedAvatar = editorRef.current?.getImage().toDataURL();
    const formData = new FormData();

    formData.append("avatar", croppedAvatar!);
    const toastId = toast.loading("Uploading avatar...");
    const result = await updateUserProfile(null, formData);

    if (result.ok) {
      toast.success("Avatar updated!", { id: toastId });
      await update({
        user: {
          ...session?.user,
          avatar: result.data?.user?.avatar,
        },
      });
      setOpen(false);
    } else {
      if (Array.isArray(result.message)) {
        return toast.error(result.message[0].message, { id: toastId });
      }
      toast.error(result.message, { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogContent
        className="grid grid-rows-[1fr_60px]
      items-center justify-center rounded-2xl bg-midground"
      >
        <div className="relative">
          <Editor
            ref={editorRef}
            image={avatar}
            width={190}
            height={190}
            borderRadius={9999}
            border={20}
            color={[43, 45, 49, 0.5]}
            scale={2}
            rotate={0}
          />
        </div>
        <DialogFooter className="flex w-full items-center justify-between gap-4">
          <Button className="px-5 font-bold" onClick={saveImage}>
            Save edit
          </Button>
          <button onClick={() => setOpen(false)}>Cancel edit</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
