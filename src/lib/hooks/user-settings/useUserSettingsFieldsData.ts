import { UpdateUserProfileResult } from "@/app/(actions)/user-settings/updateUserProfile";
import schemaFieldsToRender from "@/components/islets/user-settings-modal/usere-settings-form-schema";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export type FieldsKeys = keyof typeof schemaFieldsToRender;

export default function useUserSettingsFieldsData(
  formState: UpdateUserProfileResult | null,
) {
  const [fieldsToEdit, setFieldsToEdit] = useState<FieldsKeys[]>([]);
  const formStatus = useFormStatus();
  const inputKeys = Object.keys(schemaFieldsToRender);

  const handleEditField = (key: FieldsKeys) => {
    if (fieldsToEdit.includes(key)) {
      setFieldsToEdit((prev) => prev.filter((k) => k !== key));
    } else {
      setFieldsToEdit((prev) => [...prev, key]);
    }
  };

  useEffect(() => {
    if (formStatus.pending) return;

    if (typeof formState?.message === "string") {
      formState.message && toast.error(formState?.message);
    }
    if (formState?.ok) {
      setFieldsToEdit([]);
      toast.success("Profile updated successfully");
    }
  }, [formStatus.pending]);
  return {
    fieldsToEdit,
    handleEditField,
    fieldKeys: inputKeys,
    fieldsSchema: schemaFieldsToRender,
    formStatus,
  }
}
