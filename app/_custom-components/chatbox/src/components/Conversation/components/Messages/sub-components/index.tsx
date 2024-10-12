import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";
import React, { Fragment } from "react";
import { SystemComponent, MessageBox } from "./msg-parts";
import { useChatboxStore } from "@/app/_custom-components/chatbox/src/store";
import {
  chatMessage,
  messageSenderType,
  formatChatBoxDate,
} from "@/app/_custom-components/chatbox/src/utils";

export * from "./msg-observer";

export const MainMsgComponent = ({ message }: { message: chatMessage }) => {
  const firstDayMap = useChatboxStore((state) => state.firstDayMap);
  const { theme } = useTheme();
  const isClientMessage = message.senderType === messageSenderType.client;
  const formattedDate = formatChatBoxDate(message.timestamp);
  const isFirstdayMessage = firstDayMap[formattedDate]?.id === message.id;
  return (
    <Fragment key={message.id}>
      {isFirstdayMessage ? (
        <>
          <SystemComponent text={formatChatBoxDate(message.timestamp)} />
        </>
      ) : (
        <></>
      )}
      <MessageBox
        position={isClientMessage ? "right" : "left"}
        hideSeenAndStatus={message.hideStatusAndTime}
        hideStatus={message.senderType !== messageSenderType.client}
        msgBoxClass={`${
          isClientMessage
            ? "bg-chatBoxMsgTheme"
            : theme !== browserTheme.dark
              ? "bg-white"
              : "bg-darkContainerTheme"
        } ${isClientMessage || theme === browserTheme.dark ? "text-white" : "text-black"}`}
        text={`${message.text}`}
        date={message.timestamp}
        status={message.status}
      />
    </Fragment>
  );
};
