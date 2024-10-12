import { Subject } from "rxjs";
import {
  chatDispatcherEventTypes,
  chatDataDispatcherSubject,
  messagesState,
} from "../../utils";

export const chatBoxDataDispatcher = () => {
  const dataDispatcher = new Subject<chatDataDispatcherSubject>();
  const scrollToLatestMsg = () => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.newMsgScroll,
    });
  };

  const forwardMsgHandler = (
    messages: messagesState["messages"],
    newMsgScroll?: boolean,
    clearInput?: boolean,
  ) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.forwardMsgs,
      data: messages,
    });
    newMsgScroll && scrollToLatestMsg();
    clearInput &&
      dataDispatcher.next({
        type: chatDispatcherEventTypes.clearInput,
      });
  };

  const backwardMsgHandler = (messages: messagesState["messages"]) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.backwardMsgs,
      data: messages,
    });
  };

  const updateDetails = (details: Partial<messagesState>) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.update,
      data: details,
    });
  };

  const resetPrevDataFetch = () => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.resetPrevDataFetch,
    });
  };

  const markMsgsAsDelivered = (deliveryMap: { [key: string]: any }) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.deliveredMsgs,
      data: deliveryMap,
    });
  };

  const markMsgAsRead = (id: number) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.markMsgAsRead,
      data: id,
    });
    scrollToLatestMsg();
  };

  const resetReadMsg = (id: number) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.resetReadMsg,
      data: id,
    });
  };

  return {
    dataDispatcher,
    forwardMsgHandler,
    backwardMsgHandler,
    updateDetails,
    resetPrevDataFetch,
    markMsgsAsDelivered,
    markMsgAsRead,
    resetReadMsg,
  };
};

export type chatBoxDataDispatcherType = ReturnType<
  typeof chatBoxDataDispatcher
>;
