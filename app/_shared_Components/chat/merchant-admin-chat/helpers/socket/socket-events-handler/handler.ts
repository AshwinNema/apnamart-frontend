import * as _ from "lodash";
import { transformChatMsgs } from "../../transformer";
import { handleSocketMsgFuncParams } from "./helpers";
import { chatBoxDataDispatcherType } from "@/app/_custom-components";

export const handleSocketMsg = (
  data: handleSocketMsgFuncParams[0],
  messageType: handleSocketMsgFuncParams[1],
  chatDispatcher: chatBoxDataDispatcherType,
  merchantId?: number,
) => {
  const chatMsgs = transformChatMsgs(data.data, merchantId);
  const {
    forwardMsgHandler,
    backwardMsgHandler,
    markMsgsAsDelivered,
    markMsgAsRead,
  } = chatDispatcher;
  switch (messageType) {
    case "forward":
      forwardMsgHandler(chatMsgs, data.newMsgScroll, data.clearInput);
      break;
    case "backward":
      backwardMsgHandler(chatMsgs);
      break;
    case "message delivered":
      markMsgsAsDelivered(data.deliveredMessageMap as object);
      break;
    case "message read":
      data.readMsgId && markMsgAsRead(data.readMsgId as number);
      break;
    default:
      break;
  }
};
