import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";
import { chatMessage } from ".";

export type nullable<T> = T | null;
export type anyFunction = (...args: any[]) => any;
export * from "./store-types";

export enum messageBoxStatusTypes {
  notReceived = "notReceived",
  sent = "sent",
  delivered = "delivered",
  read = "read",
}

export type messageBoxType = {
  position: "left" | "right";
  text: string;
  date: Date;
  status: messageBoxStatusTypes;
  msgBoxClass?: string;
  hideSeenAndStatus?: boolean;
  hideStatus?: boolean;
};

export enum eventDispatcherTypes {
  scrollToBottom = "scrollToBottom",
  prevDataFetchReset = "prevDataFetchReset",
  readMsgReset = "readMsgReset",
  clearInput = "clearInput",
}

export type eventDispatcherValues =
  | {
      type: eventDispatcherTypes.scrollToBottom;
      data: {
        timer: number;
      };
    }
  | {
      type: eventDispatcherTypes.prevDataFetchReset;
    }
  | {
      type: eventDispatcherTypes.readMsgReset;
      data: number;
    }
  | {
      type: eventDispatcherTypes.clearInput;
    };

export interface msgObserverProps {
  index: number;
  children: ReactNode;
  mainMsgContainer: MutableRefObject<HTMLDivElement | null>;
  msg: chatMessage;
}
