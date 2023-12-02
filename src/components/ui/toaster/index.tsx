import { Toaster as DefaultToaster } from "react-hot-toast";
export default function Toaster() {
  return (
    <DefaultToaster
      toastOptions={{ error: { className: "bg-midground text-white" } }}
    />
  );
}
