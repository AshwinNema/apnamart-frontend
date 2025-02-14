import { Button, ScrollShadow } from "@heroui/react";
import { MainMsgComponent, MsgObserver } from "./sub-components";
import { Fragment, useContext, useEffect, useRef } from "react";
import { WidgetContext } from "@/app/_custom-components/chatbox";
import { useChatboxStore } from "../../../../store";
import { eventDispatcherTypes } from "../../../../utils";
import { FaArrowDown } from "react-icons/fa";

function Messages({}) {
  const widgetProps = useContext(WidgetContext);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const messages = useChatboxStore((state) => state.messages);
  const mainMsgContainer = useRef<null | HTMLDivElement>(null);
  const showGoDownBtn = useChatboxStore((state) => state.showGoDownBtn);
  const scrollToLastElement = (timer: number = 0) => {
    setTimeout(() => {
      lastElementRef?.current?.scrollIntoView?.({ behavior: "smooth" });
    }, timer);
  };

  useEffect(() => {
    scrollToLastElement(0);
  }, []);

  useEffect(() => {
    if (!widgetProps?.eventDispatcher) return;

    const subscription = widgetProps?.eventDispatcher.subscribe((details) => {
      switch (details.type) {
        case eventDispatcherTypes.scrollToBottom:
          scrollToLastElement(details.data.timer);
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [widgetProps?.eventDispatcher]);

  useEffect(() => {
    scrollToLastElement(500);
  }, []);

  return (
    <div className="h-[50svh] ">
      <ScrollShadow ref={mainMsgContainer} className="h-[50svh]">
        <div className="mb-8 flex flex-col gap-5 mt-5">
          {widgetProps?.initialMessages?.map?.((message) => {
            return (
              <Fragment key={message.id}>
                <MainMsgComponent message={message} />
              </Fragment>
            );
          })}
          {messages?.map?.((message, index) => {
            return (
              <Fragment key={message.id}>
                <MsgObserver
                  mainMsgContainer={mainMsgContainer}
                  index={index}
                  msg={message}
                >
                  <MainMsgComponent message={message} />
                </MsgObserver>
              </Fragment>
            );
          })}
        </div>
        <div ref={lastElementRef}></div>
      </ScrollShadow>
      {showGoDownBtn && (
        <div className="absolute -right-12 bottom-12">
          <Button
            color="danger"
            radius="full"
            onClick={() => scrollToLastElement()}
            isIconOnly={true}
          >
            <FaArrowDown className="scale-[1.5]" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Messages;
