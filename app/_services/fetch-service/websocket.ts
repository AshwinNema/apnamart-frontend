import { socketEvents } from "@/app/_utils";
import { getToken } from "./helper";

export const sendSocketData = async (
  socket: WebSocket | null,
  event: socketEvents,
  data?: any,
  sendToken?: boolean,
) => {
  if (!socket) return;
  let token;
  if (sendToken) {
    token = await getToken();
  }
  const finalData = sendToken
    ? {
        ...data,
        token,
      }
    : data;

  return socket.send(
    JSON.stringify({
      event,
      data: finalData,
    }),
  );
};
