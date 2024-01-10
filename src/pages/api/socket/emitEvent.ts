import { NextApiRequest } from "next/types";
import { NextApiResponseServerIo } from "./io";

export type EmitEventData = {
  eventId: string;
  data: unknown;
};

const emitEvent = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  const socket = res.socket.server.io;
  const event: EmitEventData | null = JSON.parse(req.body);

  if (event?.data && event?.eventId) {
    socket.emit(event.eventId, event.data);
  }
  res.end();
};

export default emitEvent;