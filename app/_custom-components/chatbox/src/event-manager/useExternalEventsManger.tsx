import { useEffect } from "react";
import { chatDispatcherEventTypes } from "../utils";
import { chatBoxProps } from "../..";
import { useChatboxStore } from "../store";

const useExternalEventsManger = ({
  dataDispatcher,
}: {
  dataDispatcher: chatBoxProps["dataDispatcher"];
}) => {
  const addMessagesAtFront = useChatboxStore(
    (state) => state.addMessagesAtFront,
  );
  const updateMsgState = useChatboxStore((state) => state.updateMsgState);
  const addMessagesAtBack = useChatboxStore((state) => state.addMessagesAtBack);
  const showGoDownBtn = useChatboxStore((state) => state.showGoDownBtn);
  const markMsgsAsDelivered = useChatboxStore(
    (state) => state.markMsgsAsDelivered,
  );
  const markMsgAsRead = useChatboxStore((state) => state.markMsgAsRead);
  const messages = useChatboxStore((state) => state.messages);

  useEffect(() => {
    if (!dataDispatcher) {
      return;
    }

    const eventSubscription = dataDispatcher?.subscribe?.({
      next: (event) => {
        switch (event.type) {
          case chatDispatcherEventTypes.update:
            updateMsgState(event.data);
            break;

          case chatDispatcherEventTypes.forwardMsgs:
            addMessagesAtFront(event.data);
            break;

          case chatDispatcherEventTypes.backwardMsgs:
            addMessagesAtBack(event.data);
            break;

          case chatDispatcherEventTypes.deliveredMsgs:
            markMsgsAsDelivered(event.data);
            break;

          case chatDispatcherEventTypes.markMsgAsRead:
            markMsgAsRead(event.data);
            break;

          case chatDispatcherEventTypes.getlastMsg:
            dataDispatcher.next({
              type: chatDispatcherEventTypes.sendlastMsg,
              data: messages?.[messages.length - 1]?.id,
            });
            break;

          default:
            break;
        }
      },
    });

    return () => {
      eventSubscription?.unsubscribe();
    };
  }, [dataDispatcher, showGoDownBtn]);
};

export default useExternalEventsManger;
