import { StateCreator } from "zustand";
import { produce } from "immer";
import {
  assignDateKey,
  messageBoxStatusTypes,
  messagesState,
} from "../../utils";
// front = at the end of the array = push
// back = at the beginning of the array = unshift
export interface messageSlice extends messagesState {
  updateMsgState: (details: Partial<messagesState>) => void;
  addMessagesAtFront: (messages: messagesState["messages"]) => void;
  addMessagesAtBack: (messages: messagesState["messages"]) => void;
  markMsgsAsDelivered: (deliveryMap: { [key: string]: any }) => void;
  markMsgAsRead: (id: number) => void;
}

const initialState = {
  messages: [],
  unreadMsgCount: 0,
  firstDayMap: {},
};

export const createMessageSlice: StateCreator<
  messageSlice,
  [],
  [],
  messageSlice
> = (set) => ({
  ...initialState,
  updateMsgState: (details) => {
    set(() => ({ ...details }));
  },
  addMessagesAtFront: (messages) => {
    set(
      produce((state: messageSlice) => {
        messages.forEach((message) => {
          const { firstDayMap } = state;
          assignDateKey(message.id, message.timestamp, firstDayMap);
        });
        state.messages.push(...messages);
        return state;
      }),
    );
  },
  addMessagesAtBack: (messages) => {
    set(
      produce((state: messageSlice) => {
        const newFirstId = messages?.[0]?.id || null;
        const currentFirstId = state.messages?.[0]?.id || null;
        if (newFirstId === currentFirstId) return state;
        messages.forEach((message) => {
          const { firstDayMap } = state;
          assignDateKey(message.id, message.timestamp, firstDayMap);
        });
        state.messages.unshift(...messages);
        return state;
      }),
    );
  },
  markMsgsAsDelivered: (deliveryMap) => {
    set(
      produce((state: messageSlice) => {
        state.messages.forEach((msg) => {
          const { id } = msg;
          const isDelivered = deliveryMap[id];
          if (!isDelivered) return;
          msg.status = messageBoxStatusTypes.delivered;
        });
        return state;
      }),
    );
  },
  markMsgAsRead: (id) => {
    set(
      produce((state: messageSlice) => {
        const msg = state.messages.find((msg) => msg.id === id);
        if (msg) {
          msg.status = messageBoxStatusTypes.read;
        }

        return state;
      }),
    );
  },
});
