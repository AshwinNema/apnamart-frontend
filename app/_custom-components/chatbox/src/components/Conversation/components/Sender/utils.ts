import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { pickerStateChanger } from "./emoji-picker";
import { setKeyVal } from "@/app/_utils";
import { v4 } from "uuid";
import {
  messageSenderType,
  messageBoxStatusTypes,
  eventDispatcherTypes,
  eventDispatcherValues,
} from "../../../../utils";
import { messageSlice } from "../../../../store/slice";
import { Subject } from "rxjs";

export interface senderState {
  pickerOffset: number;
  height: number;
  showPicker: boolean;
  inputVal: string;
}

export const handleEmojiEvents = (
  behaviour: pickerStateChanger = "toggle",
  config: senderState,
  setConfig: Dispatch<SetStateAction<senderState>>,
  senderInputContainer: MutableRefObject<HTMLDivElement | null>,
) => {
  const senderEl = senderInputContainer.current;
  let updates: Partial<senderState> = {};
  if (senderEl && config.height !== senderEl.clientHeight) {
    const { clientHeight } = senderEl;
    updates = {
      height: clientHeight,
      pickerOffset: clientHeight ? clientHeight - 1 : 0,
    };
  }

  setConfig((prevConfig) => {
    const { showPicker } = prevConfig;
    return {
      ...prevConfig,
      ...config,
      showPicker:
        behaviour === "open"
          ? true
          : behaviour === "close"
            ? false
            : behaviour === "toggle"
              ? !showPicker
              : showPicker,
    };
  });
};

export const addChatboxMsg = (
  inputVal: string,
  setData: setKeyVal,
  setMsgs: messageSlice["addMessagesAtFront"],
  eventDispatcher: Subject<eventDispatcherValues>,
) => {
  const value = inputVal.trim();
  if (!value) return;
  const id = v4();
  const timestamp = new Date();
  eventDispatcher.next({
    type: eventDispatcherTypes.scrollToBottom,
    data: {
      timer: 150,
    },
  });
  setMsgs([
    {
      senderType: messageSenderType.client,
      timestamp: timestamp,
      status: messageBoxStatusTypes.sent,
      id,
      text: value,
      hideStatusAndTime: false,
    },
  ]);

  setData("inputVal")("");
};
