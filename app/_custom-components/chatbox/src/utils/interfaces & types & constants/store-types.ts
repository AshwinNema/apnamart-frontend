import { messageBoxType } from ".";

export enum componentType {
  textComponent = "Text Component",
  systemComponent = "System Component",
}
export enum messageSenderType {
  client = "client",
  response = "response",
}

export interface chatMessage {
  senderType: messageSenderType;
  timestamp: Date;
  status: messageBoxType["status"];
  id: string | number;
  text: string;
  hideStatusAndTime?: boolean;
}
// firstDayMap - This map store the first message for a particular day. Here
// 1.id = id of the message for that day
// 2.time = time stamp for that day

export interface messagesState {
  messages: chatMessage[];
  firstDayMap: {
    [date: string]: {
      id: string | number;
      time: Date;
    };
  };
  unreadMsgCount: number;
}

export enum chatDispatcherEventTypes {
  forwardMsgs = "forwardMsgs",
  backwardMsgs = "backwardMsgs",
  update = "update",
  resetPrevDataFetch = "resetPrevDataFetch",
  deliveredMsgs = "deliveredMsgs",
  markMsgAsRead = "markMsgAsRead",
  resetReadMsg = "resetReadMsg",
  newMsgScroll = "newMsgScroll",
  getlastMsg = "getLastMsg",
  sendlastMsg = "sendlastMsg",
  clearInput = "clearInput",
}

export type chatDataDispatcherSubject =
  | {
      type: chatDispatcherEventTypes.forwardMsgs;
      data: messagesState["messages"];
    }
  | {
      type: chatDispatcherEventTypes.backwardMsgs;
      data: messagesState["messages"];
    }
  | {
      type: chatDispatcherEventTypes.update;
      data: Partial<messagesState>;
    }
  | {
      type: chatDispatcherEventTypes.resetPrevDataFetch;
    }
  | {
      type: chatDispatcherEventTypes.deliveredMsgs;
      data: {
        [key: string]: any;
      };
    }
  | {
      type: chatDispatcherEventTypes.markMsgAsRead;
      data: number;
    }
  | {
      type: chatDispatcherEventTypes.resetReadMsg;
      data: number;
    }
  | {
      type: chatDispatcherEventTypes.newMsgScroll;
    }
  | {
      type: chatDispatcherEventTypes.getlastMsg;
    }
  | {
      type: chatDispatcherEventTypes.sendlastMsg;
      data?: number | string;
    }
  | {
      type: chatDispatcherEventTypes.clearInput;
    };
