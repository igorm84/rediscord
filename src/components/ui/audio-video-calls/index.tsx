import { User } from "@/lib/entities/user";

interface AudioVideoCallProps {
  user: User | undefined;
  currentUser: User | null;
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
