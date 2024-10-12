import { WidgetContext } from "@/app/_custom-components/chatbox";
import {
  chatMessage,
  eventDispatcherTypes,
  messageBoxStatusTypes,
  messageSenderType,
} from "@/app/_custom-components/chatbox/src/utils";
import { MutableRefObject, useContext, useEffect, useRef } from "react";

const useMsgReadObserver = ({
  containerRef,
  mainMsgContainer,
  msg,
}: {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  mainMsgContainer: MutableRefObject<HTMLDivElement | null>;
  msg: chatMessage;
}) => {
  const msgStatusRef = useRef(msg.status);
  const msgStatusLoadTracker = useRef(false);
  const msgReadIntersectionObserver = useRef<IntersectionObserver | null>(null);
  const isRequestSent = useRef(false);
  const widgetProps = useContext(WidgetContext);

  useEffect(() => {
    if (!widgetProps?.eventDispatcher) return;
    const subscription = widgetProps?.eventDispatcher?.subscribe((event) => {
      const hasToResetMsgRead =
        event.type === eventDispatcherTypes.readMsgReset;
      if (!hasToResetMsgRead) return;
      const hasToResetCurMsgRead = event.data === msg.id;
      if (!hasToResetCurMsgRead) return;
      isRequestSent.current = false;
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [widgetProps?.eventDispatcher, msg.id]);

  useEffect(() => {
    setTimeout(() => {
      msgStatusLoadTracker.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    msgStatusRef.current = msg.status;
  }, [msg.status]);

  useEffect(() => {
    setTimeout(() => {
      if (!containerRef.current || !mainMsgContainer.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const { isIntersecting } = entries[0];
          if (!isIntersecting) return;

          const isReceiver = msg.senderType === messageSenderType.response;
          const isMsgUnread =
            msgStatusRef.current !== messageBoxStatusTypes.read;
          const isMsgStatusLoaded = msgStatusLoadTracker.current;

          const hasReadMsg1stTime =
            isReceiver &&
            isMsgUnread &&
            isMsgStatusLoaded &&
            !isRequestSent.current;

          if (!hasReadMsg1stTime) return;
          isRequestSent.current = true;
          widgetProps?.markMsgAsRead?.(msg.id);
        },
        {
          rootMargin: "32px",
          root: mainMsgContainer.current,
          threshold: [1],
        },
      );
      observer.observe(containerRef.current);
      msgReadIntersectionObserver.current = observer;
    }, 1000);

    return () => {
      msgReadIntersectionObserver.current &&
        msgReadIntersectionObserver.current.disconnect();
    };
  }, []);
  return null;
};

export default useMsgReadObserver;
