import { useEffect } from "react";
import {
  useForm,
  FieldValues,
  UseFormReturn,
  Path,
  UseFormProps,
} from "react-hook-form";

export function useFormWithLocalStorage<T extends FieldValues>(
  defaultValues: UseFormProps<T>,
): UseFormReturn<T> {
  const formMethods = useForm<T>(defaultValues);
  const { watch, setValue } = formMethods;

  // Load saved form data from localStorage
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      for (const key in parsedData) {
        setValue(key as Path<T>, parsedData[key]);
      }
    }
  }, [setValue]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const formData = watch();
    localStorage.setItem("formData", JSON.stringify(formData));
    return () => localStorage.removeItem("formData");
  }, [watch()]);

  return formMethods;
}
