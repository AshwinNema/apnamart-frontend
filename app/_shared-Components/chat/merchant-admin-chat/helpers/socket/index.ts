import { chatBoxDataDispatcherType } from "@/app/_custom-components";
import { sendSocketData } from "@/app/_services";
import { socketEvents, webSocketReadyState } from "@/app/_utils";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { chatSupportConfig } from "./socket-events-handler";
export * from "./initital-connection";

export interface reestablishConnectionDetails {
  event: socketEvents;
  data: any;
}
export type reconnectFunc = (details: reestablishConnectionDetails) => void;
export const checkOpenConnection = (socket: WebSocket | null) => {
  return socket?.readyState === webSocketReadyState.OPEN_STATE;
};

export const sendChatMsg = (
  socket: WebSocket | null,
  message: string,
  reconnect?: reconnectFunc,
) => {
  const event = socketEvents.sendMerchantAdminChatMsg;
  if (!checkOpenConnection(socket) || !socket) {
    reconnect && reconnect({ event, data: message });
    return;
  }
  return sendSocketData(socket, event, message);
};

export const queryChatMsgs = (
  socket: WebSocket | null,
  details: {
    cursor: number;
    limit: number;
  },
  reconnect: reconnectFunc,
) => {
  const event = socketEvents.queryChatsMsgs;
  if (!checkOpenConnection(socket) || !socket) {
    reconnect({ event, data: details });
    return;
  }
  return sendSocketData(socket, event, details);
};

export const markMsgAsRead = (
  socket: WebSocket | null,
  id: number,
  reconnect: reconnectFunc,
) => {
  const event = socketEvents.markMsgAsRead;
  if (!checkOpenConnection(socket) || !socket) {
    reconnect({ event, data: id });
    return;
  }
  return sendSocketData(socket, event, id);
};

export type dataManagerHookReturnType = [
  MutableRefObject<WebSocket | null>,
  chatBoxDataDispatcherType["dataDispatcher"],
  chatSupportConfig,
  Dispatch<SetStateAction<chatSupportConfig>>,
  MutableRefObject<null | reestablishConnectionDetails>,
];
