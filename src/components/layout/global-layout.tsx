import { Toaster } from "react-hot-toast";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";

export default function GlobalLayout() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgb(var(--color-black))",
            padding: 4,
            color: "white",
            fontSize: 14,
          },
          error: {
            icon: <BsExclamationCircle className="ml-1 text-red-500" />,
          },
          success: {
            icon: <BsCheckCircle className="ml-1 text-green-500" />,
          },
        }}
      />
    </>
  );
}
