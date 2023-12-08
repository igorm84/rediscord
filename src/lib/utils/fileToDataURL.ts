export default async function fileToDataUrl(
  file: File | null | undefined,
  callback: (dataUrl: string) => void,
) {
  const reader = new FileReader();
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("File is not an image");
  }

  reader.onload = () => {
    callback(reader.result as string);
  };
  reader.onerror = (error) => {
    throw error;
  };
  reader.readAsDataURL(file);
}
