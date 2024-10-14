import { errorToast, socketEvents } from "@/app/_utils";
import { chatMsg } from "../../transformer";
import * as _ from "lodash";
export * from "./handler";

export interface chatSupportConfig {
  limit: number;
  merchantRegistrationId?: number;
  totalResults: number;
  reestablishConnection: boolean;
  cursor?: number;
  socketTrigger: boolean;
}

export interface socketChatHandlerData {
  data?: chatMsg[];
  totalResults?: number;
  unreadMsgCount?: number;
  deliveredMessageMap?: {
    [key: string]: any;
  };
  readMsgId?: number;
  newMsgScroll?: boolean;
  isReconnectionReq?: boolean;
  clearInput?: boolean;
}

export type handleSocketMsgFunc = (
  data: socketChatHandlerData,
  messageType: "forward" | "backward" | "message delivered" | "message read",
) => void;
export type handleSocketMsgFuncParams = Parameters<handleSocketMsgFunc>;

export const handleErrs = (
  event: string,
  error: any,
  resetPrevDataFetch: () => void,
  resetReadMsg: (id: number) => void,
) => {
  if (typeof error === "string") {
    errorToast({ msg: error });
  }

  switch (event) {
    case socketEvents.sendMerchantAdminChatMsg:
      break;

    case socketEvents.queryChatsMsgs:
      resetPrevDataFetch();
      break;
    case socketEvents.markMsgAsRead:
      if (!error.id) break;
      resetReadMsg(error.id);
      break;
    default:
      break;
  }
};

export const handleDeliveredMsg = (
  handleSocketMsg: handleSocketMsgFunc,
  chatData: number[],
) => {
  handleSocketMsg(
    {
      deliveredMessageMap: chatData.reduce(
        (
          deliveryMap: {
            [key: string]: any;
          },
          id: number,
        ) => {
          deliveryMap[`${id}`] = true;
          return deliveryMap;
        },
        {},
      ),
    },
    "message delivered",
  );
};

export const handleReadMsg = (
  handleSocketMsg: handleSocketMsgFunc,
  chatData: {
    id?: number;
    unreadMsgCount?: number;
  },
) => {
  const finalDetails: {
    readMsgId?: number;
    unreadMsgCount?: number;
  } = _.pick(chatData, ["unreadMsgCount"]);
  if (chatData.id) {
    finalDetails.readMsgId = chatData.id;
  }
  handleSocketMsg(finalDetails, "message read");
};
