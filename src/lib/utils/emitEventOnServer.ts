import { EmitEventData } from "@/pages/api/socket/emitEvent";

export default async function emitEventOnServer(event: EmitEventData) {
  try {
    const res = await fetch(
      `${process.env.PUBLIC_URL}/api/socket/emitEvent`,
      {
        method: "POST",
        body: JSON.stringify(event),
        cache: "no-store",
      },
    );
  } catch (error) {
    console.log(error);
  }
}
