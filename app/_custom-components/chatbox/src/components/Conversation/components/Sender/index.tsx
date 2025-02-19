import { useRef, useState, useCallback, useContext, useEffect } from "react";
import { Input } from "@heroui/react";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useHover } from "react-aria";
import EmojiPicker, { pickerStateChanger } from "./emoji-picker";
import { setNestedPath } from "@/app/_utils";
import { addChatboxMsg, handleEmojiEvents, senderState } from "./utils";
import { WidgetContext } from "@/app/_custom-components/chatbox";
import { useChatboxStore } from "../../../../store";
import { eventDispatcherTypes } from "../../../../utils";

function Sender() {
  const senderInputContainer = useRef<HTMLDivElement | null>(null);
  const addMessagesAtFront = useChatboxStore(
    (state) => state.addMessagesAtFront,
  );
  const [config, setConfig] = useState<senderState>({
    pickerOffset: 0,
    height: 0,
    showPicker: false,
    inputVal: "",
  });
  const emojiEventHandler = (behaviour: pickerStateChanger = "toggle") => {
    handleEmojiEvents(behaviour, config, setConfig, senderInputContainer);
  };

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  let { hoverProps } = useHover({
    onHoverStart: (e) => {
      emojiEventHandler("open");
    },
  });

  const widgetProps = useContext(WidgetContext);
  useEffect(() => {
    if (!widgetProps?.eventDispatcher) return;
    const subscription = widgetProps?.eventDispatcher?.subscribe((event) => {
      if (event.type === eventDispatcherTypes.clearInput) {
        setData("inputVal")("");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [widgetProps?.eventDispatcher]);
  if (!widgetProps) return null;
  const { eventDispatcher } = widgetProps;
  return (
    <>
      <EmojiPicker config={config} setConfig={setConfig} />
      <div ref={senderInputContainer}>
        <div className="w-full ">
          <Input
            className="bg-[transparent] mb-5"
            value={config.inputVal}
            onValueChange={setData("inputVal")}
            classNames={{
              base: ["scale-y-[2]"],
              input: ["scale-y-[0.5]"],
            }}
            radius="none"
            startContent={
              <div {...hoverProps}>
                <FaRegSmile
                  className="scale-y-[0.5] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    emojiEventHandler("toggle");
                  }}
                />
              </div>
            }
            fullWidth={true}
            endContent={
              <IoSend
                onClick={() => {
                  const value = config.inputVal.trim();
                  if (!value) return;
                  if (widgetProps.customAddMsg) {
                    widgetProps.customAddMsg(value);
                    return;
                  }
                  addChatboxMsg(
                    config.inputVal,
                    setData,
                    addMessagesAtFront,
                    eventDispatcher,
                  );
                }}
                className={`scale-y-[0.5] cursor-pointer ${
                  !config.inputVal.trim() && "opacity-50"
                }`}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default Sender;
