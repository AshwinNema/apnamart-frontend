import { socketEvents } from "@/app/_utils";
import {
  handleDeliveredMsg,
  handleErrs,
  handleReadMsg,
  handleSocketMsgFunc,
} from "./helpers";
export * from "./helpers";

import { getLocalStorageKey, storageAttributes } from "@/app/_services";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { chatBoxDataDispatcherType } from "@/app/_custom-components";

export const socketEventsProcessor = (
  chatData: any,
  handleProcessedData: handleSocketMsgFunc,
  chatDispatcher: chatBoxDataDispatcherType,
) => {
  const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
  switch (chatData?.event) {
    case socketEvents.reinitiateMerchantAdminChat:
    case socketEvents.initiateMerchantAdminChat:
      handleProcessedData(
        {
          data: chatData.results.reverse(),
          totalResults: chatData.totalResults,
          unreadMsgCount: chatData.unreadMsgCount,
          isReconnectionReq:
            chatData?.event === socketEvents.reinitiateMerchantAdminChat,
        },
        "forward",
      );
      break;

    case socketEvents.sendMerchantAdminChatMsg:
      {
        const isUserSender = chatData?.data?.msg?.senderId === user?.id;
        handleProcessedData(
          {
            data: [chatData.data.msg],
            totalResults: chatData.data.totalResults,
            unreadMsgCount: chatData.data.unreadMsgCount,
            newMsgScroll: true,
            clearInput: isUserSender,
          },
          "forward",
        );
      }
      break;

    case socketEvents.queryChatsMsgs:
      handleProcessedData(
        {
          data: chatData.results.reverse(),
          totalResults: chatData.totalResults,
          unreadMsgCount: chatData.unreadMsgCount,
        },
        "backward",
      );
      break;

    case socketEvents.messagesDelivered:
      chatData.data && handleDeliveredMsg(handleProcessedData, chatData.data);
      break;

    case socketEvents.markMsgAsRead:
      handleReadMsg(handleProcessedData, chatData?.data);
      break;

    case socketEvents.error:
      handleErrs(
        chatData.data.event,
        chatData.data.error,
        chatDispatcher.resetPrevDataFetch,
        chatDispatcher.resetReadMsg,
      );
      break;

    default:
      break;
  }
};
