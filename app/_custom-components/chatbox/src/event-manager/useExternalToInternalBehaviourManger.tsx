import { useEffect } from "react";
import { Subject } from "rxjs";
import {
  chatDispatcherEventTypes,
  eventDispatcherTypes,
  eventDispatcherValues,
} from "../utils";
import { chatBoxProps } from "../..";
import { useChatboxStore } from "../store";

const useExternalToInternalBehaviourManger = ({
  dataDispatcher,
}: {
  dataDispatcher: chatBoxProps["dataDispatcher"];
}): Subject<eventDispatcherValues> => {
  const eventDispatcher = new Subject<eventDispatcherValues>();
  const showGoDownBtn = useChatboxStore((state) => state.showGoDownBtn);

  useEffect(() => {
    if (!dataDispatcher) {
      return;
    }

    const eventSubscription = dataDispatcher?.subscribe?.({
      next: (event) => {
        switch (event.type) {
          case chatDispatcherEventTypes.resetPrevDataFetch:
            eventDispatcher.next({
              type: eventDispatcherTypes.prevDataFetchReset,
            });
            break;

          case chatDispatcherEventTypes.resetReadMsg:
            eventDispatcher.next({
              type: eventDispatcherTypes.readMsgReset,
              data: event.data,
            });
            break;

          case chatDispatcherEventTypes.newMsgScroll: {
            const isAtLastElement = !showGoDownBtn;
            isAtLastElement &&
              eventDispatcher.next({
                type: eventDispatcherTypes.scrollToBottom,
                data: {
                  timer: 350,
                },
              });
            break;
          }

          case chatDispatcherEventTypes.clearInput:
            eventDispatcher.next({
              type: eventDispatcherTypes.clearInput,
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

  return eventDispatcher;
};

export default useExternalToInternalBehaviourManger;
