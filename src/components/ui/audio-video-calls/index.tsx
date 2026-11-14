import { User } from "@/lib/entities/user";

interface AudioVideoCallProps {
  /** @deprecated Ignored. Kept optional until dm-channel stops passing it. */
  user?: User;
  /** @deprecated Ignored. Kept optional until dm-channel stops passing it. */
  currentUser?: User | null;
  handleVideoCallEnd: () => void;
}
export default function AudioVideoCall({
  handleVideoCallEnd,
}: AudioVideoCallProps) {
  return (
    <div className="ml-24 p-4 text-sm text-gray-300">
      Video calls are disabled in this public preview.
      <button
        className="ml-4 text-primary hover:text-white"
        onClick={handleVideoCallEnd}
      >
        Close
      </button>
    </div>
  );
}
