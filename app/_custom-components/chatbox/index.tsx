import { createContext, ReactNode } from "react";
import Widget from "./src";
import { ChatIcon } from "./src/assets";
import { ChatboxStoreProvider } from "./src/store";
import {
  chatMessage,
  anyFunction,
  chatDataDispatcherSubject,
  eventDispatcherValues,
} from "./src/utils";
import { Subject } from "rxjs";
export { type chatboxStoreApi } from "./src/store";
export {
  chatBoxDataDispatcher,
  type chatBoxDataDispatcherType,
} from "./src/store";
export {
  type messagesState,
  messageBoxStatusTypes,
  messageSenderType,
  type chatDataDispatcherSubject,
} from "./src/utils";

export type chatBoxProps = {
  handleToggle?: anyFunction;
  resizable?: boolean;
  title?: ReactNode;
  subtitle?: string;
  initialMessages?: chatMessage[];
  customAddMsg?: (msg: string) => void;
  getPrevMsgs?: (firstMsgId: chatMessage["id"], msgLength: number) => void;
  dataDispatcher?: Subject<chatDataDispatcherSubject>;
  markMsgAsRead?: (msgId: chatMessage["id"]) => void;
};

type widgetChatBoxProps = Omit<chatBoxProps, "dataDispatcher">;

interface widgetProps extends widgetChatBoxProps {
  eventDispatcher: Subject<eventDispatcherValues>;
  getPrevMsgs?: () => void;
}

export const WidgetContext = createContext<null | widgetProps>(null);

const Chatbox = ({
  title = "Welcome",
  subtitle = "This is your chat subtitle",
  ...props
}: chatBoxProps) => {
  return (
    <ChatboxStoreProvider>
      <Widget title={title} subtitle={subtitle} {...props} />
    </ChatboxStoreProvider>
  );
};

export { Chatbox, ChatIcon };
