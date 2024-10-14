import { WidgetContext } from "@/app/_custom-components/chatbox";
import { useChatboxStore } from "@/app/_custom-components/chatbox/src/store";
import { msgObserverProps } from "@/app/_custom-components/chatbox/src/utils";
import { useRef, useContext, useEffect } from "react";
import useScrollDataHandler from "./useScrollDataHandler";
import useMsgReadObserver from "./useMsgReadObserver";

export const MsgObserver = ({
  index,
  children,
  mainMsgContainer,
  msg,
}: msgObserverProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetProps = useContext(WidgetContext);
  const isRequestSent = useRef(false);
  const msgLoadTracker = useRef(false);
  const indexRef = useRef(index);
  const messageLen = useChatboxStore((state) => state.messages.length);
  const controlGoDownBtn = useChatboxStore((state) => state.controlGoDownBtn);
  useScrollDataHandler({
    isRequestSent,
    msgLoadTracker,
    indexRef,
    index,
  });

  useMsgReadObserver({
    containerRef,
    mainMsgContainer,
    msg,
  });

  useEffect(() => {
    if (!containerRef.current || !mainMsgContainer.current) return;

    const observer = new IntersectionObserver(
      () => {
        const isFirstElement = indexRef.current === 1;
        const isMsgLoaded = msgLoadTracker.current;
        if (isFirstElement && !isRequestSent.current && isMsgLoaded) {
          isRequestSent.current = true;
          widgetProps?.getPrevMsgs?.();
        }
      },
      {
        root: mainMsgContainer.current,
        threshold: [1],
      },
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mainMsgContainer.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const isLastElement = messageLen - 1 === index;
        isLastElement && controlGoDownBtn(!entries[0].isIntersecting);
      },
      {
        rootMargin: "32px",
        root: mainMsgContainer.current,
        threshold: [1],
      },
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [index, messageLen]);

  return <div ref={containerRef}>{children}</div>;
};
