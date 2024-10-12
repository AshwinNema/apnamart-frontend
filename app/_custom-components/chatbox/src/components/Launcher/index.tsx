import { Badge, Button, user } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useChatboxStore } from "../../store";
import { ChatIcon } from "../../assets";

type Props = {
  toggle: () => void;
};

function Launcher({ toggle }: Props) {
  const showChat = useChatboxStore((state) => state.showChat);
  const unreadMsgCount = useChatboxStore((state) => state.unreadMsgCount);

  const LauncherBtn = () => {
    return (
      <Button
        size="lg"
        className="p-2"
        isIconOnly={true}
        radius="full"
        color="primary"
        onPress={toggle}
      >
        {showChat && <IoClose className="scale-[2]" />}
        {!showChat && <ChatIcon />}
      </Button>
    );
  };

  return (
    <div className="absolute right-0 bottom-0">
      {unreadMsgCount ? (
        <Badge color="secondary" content={<>{unreadMsgCount}</>}>
          <LauncherBtn />
        </Badge>
      ) : (
        <LauncherBtn />
      )}
    </div>
  );
}

export default Launcher;
