import { chatDispatcherEventTypes } from "@/app/_custom-components/chatbox/src/utils";
import { Dispatch, SetStateAction, useEffect } from "react";
import { reconnectFunc } from "../helpers";
import { produce } from "immer";
import { chatBoxDataDispatcherType } from "@/app/_custom-components";
import { chatSupportConfig } from "../helpers/socket/socket-events-handler";

const useReconnectSocket = ({
  dataDispatcher,
  setConfig,
}: {
  dataDispatcher: chatBoxDataDispatcherType["dataDispatcher"];
  setConfig: Dispatch<SetStateAction<chatSupportConfig>>;
}): [reconnectFunc] => {
  useEffect(() => {
    const subscription = dataDispatcher.subscribe((details) => {
      if (details.type === chatDispatcherEventTypes.sendlastMsg) {
        setConfig(
          produce((draft) => {
            draft.reestablishConnection = true;
            draft.socketTrigger = !draft.socketTrigger;
            draft.cursor = details.data as number | undefined;
          }),
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const reconnectSocket: reconnectFunc = (details) => {
    dataDispatcher.next({
      type: chatDispatcherEventTypes.getlastMsg,
    });
  };

  return [reconnectSocket];
};

export default useReconnectSocket;
