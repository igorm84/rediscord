/* eslint-disable react-hooks/exhaustive-deps */
import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import React from "react";
import { Track } from "livekit-client";
import { User } from "@/lib/entities/user";

interface AudioVideoCallProps {
  user: User | undefined;
  currentUser: User | null;
  handleVideoCallEnd: () => void;
}
export default function AudioVideoCall({
  //   user
  currentUser,
  handleVideoCallEnd,
}: AudioVideoCallProps) {
  const [token, setToken] = React.useState("");
  const channel = currentUser?.name;

  const name = currentUser?.name;

  React.useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`/api/token?room=${channel}&username=${name}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return <div className="ml-24">Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      connect={true}
      onDisconnected={handleVideoCallEnd}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{
        zIndex: "100",
        height: "60vh",
        width: "100%",
        position: "sticky",
        top: "0px",
      }}
    >
      <MyVideoConference currentUser={currentUser} />
      <RoomAudioRenderer />
      <ControlBar data-lk-theme="default" style={{ background: "black" }} />
    </LiveKitRoom>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MyVideoConference({ currentUser }: { currentUser: User | null }) {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* TODO make custom avatar default */}
      <ParticipantTile />
    </GridLayout>
  );
}
