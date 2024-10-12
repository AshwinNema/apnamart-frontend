import Conversation from "./components/Conversation";
import Launcher from "./components/Launcher";
import { useChatboxStore } from "./store";
import { chatBoxProps, WidgetContext } from "..";
import { useRef } from "react";
import useExternalEventsManger from "./event-manager/useExternalEventsManger";
import useExternalToInternalBehaviourManger from "./event-manager/useExternalToInternalBehaviourManger";

function Widget(props: chatBoxProps) {
  const toggleChat = useChatboxStore((state) => state.toggleChat);
  const showChat = useChatboxStore((state) => state.showChat);
  const isChatClosed = useRef(true);
  const firstMessageId = useChatboxStore((state) => state.messages?.[0]?.id);
  const messagesLength = useChatboxStore((state) => state.messages.length);

  useExternalEventsManger({
    dataDispatcher: props.dataDispatcher,
  });
  const eventDispatcher = useExternalToInternalBehaviourManger({
    dataDispatcher: props.dataDispatcher,
  });

  const toggleConversation = () => {
    isChatClosed.current = !isChatClosed.current;
    const handleToggle = props?.handleToggle;
    toggleChat();
    handleToggle ? handleToggle(showChat) : null;
  };

  return (
    <>
      <WidgetContext.Provider
        value={{
          title: props.title,
          subtitle: props.subtitle,
          handleToggle: props.handleToggle,
          resizable: props.resizable,
          initialMessages: props.initialMessages,
          customAddMsg: props.customAddMsg,
          getPrevMsgs: () => {
            if (isChatClosed.current) return;
            props?.getPrevMsgs &&
              props.getPrevMsgs(firstMessageId, messagesLength);
          },
          eventDispatcher: eventDispatcher,
          markMsgAsRead: props.markMsgAsRead,
        }}
      >
        <div className={`flex flex-col bottom-0 right-0 fixed mr-16 mb-5 z-10`}>
          {showChat && <Conversation />}
          <Launcher toggle={toggleConversation} />
        </div>
      </WidgetContext.Provider>
    </>
  );
}

export default Widget;
