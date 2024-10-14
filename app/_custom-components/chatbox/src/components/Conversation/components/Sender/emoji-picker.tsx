import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { senderState } from "./utils";
import { setNestedPath } from "@/app/_utils";
export type pickerStateChanger = "toggle" | "open" | "close";

function EmojiPicker({
  config,
  setConfig,
}: {
  config: senderState;
  setConfig: Dispatch<SetStateAction<senderState>>;
}) {
  const { showPicker, pickerOffset } = config;
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  const onSelectEmoji = (emoji: { native: string }) => {
    setData("inputVal")(`${config.inputVal}${emoji.native}`);
  };

  if (!showPicker) return null;
  return (
    <>
      <div
        className={`absolute left-0 w-full`}
        style={{
          bottom: pickerOffset + 70,
        }}
      >
        <Picker
          onClickOutside={() => {
            setData("showPicker")(false);
          }}
          data={data}
          onEmojiSelect={onSelectEmoji}
        />
      </div>
    </>
  );
}

export default EmojiPicker;
