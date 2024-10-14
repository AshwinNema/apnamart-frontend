import {
  getLocalStorageKey,
  sendSocketData,
  storageAttributes,
} from "@/app/_services";
import { socketEvents, webSocketEndPoints } from "@/app/_utils";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import * as _ from "lodash";
import { MutableRefObject } from "react";
import { chatSupportConfig } from "../socket-events-handler";

export const establishSocketConnection = (
  config: chatSupportConfig,
  socketRef: MutableRefObject<WebSocket | null>,
  onmessage: (data: any) => void,
) => {
  const socketConnection = new WebSocket(webSocketEndPoints.CHAT, []);
  socketConnection.onopen = function () {
    const options: {
      limit?: number;
      role?: UserRole;
      merchantRegistrationId?: number;
      cursor?: number;
    } = _.pick(config, [
      `${config.reestablishConnection ? "cursor" : "limit"}`,
      "merchantRegistrationId",
    ]);
    if (!options.cursor) delete options.cursor;
    const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    options.role = user?.role;
    sendSocketData(
      socketConnection,
      config.reestablishConnection
        ? socketEvents.reinitiateMerchantAdminChat
        : socketEvents.initiateMerchantAdminChat,
      options,
      true,
    );
    socketConnection.onerror = function (error) {
      console.log(error, "this is the error");
    };
    socketConnection.onmessage = function (data) {
      onmessage(data);
    };
  };
  socketRef.current = socketConnection;
};
