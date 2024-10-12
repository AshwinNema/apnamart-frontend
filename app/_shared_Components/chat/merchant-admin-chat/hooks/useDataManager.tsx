import { chatBoxDataDispatcher } from "@/app/_custom-components";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  checkOpenConnection,
  dataManagerHookReturnType,
  establishSocketConnection,
  reestablishConnectionDetails,
} from "../helpers";
import {
  chatSupportConfig,
  handleSocketMsg,
  socketEventsProcessor,
} from "../helpers/socket/socket-events-handler";
import { produce } from "immer";
import * as _ from "lodash";
import { sendSocketData } from "@/app/_services";

const useDataManager = (
  merchantRegistrationId?: number,
  merchantId?: number,
): dataManagerHookReturnType => {
  const socketRef = useRef<WebSocket | null>(null);
  const connectionReestablisherEvent =
    useRef<null | reestablishConnectionDetails>(null);
  const chatDispatcher = useMemo(() => chatBoxDataDispatcher(), []);

  const [config, setConfig] = useState<chatSupportConfig>({
    limit: 10,
    totalResults: 0,
    reestablishConnection: false,
    socketTrigger: false,
  });
  useEffect(() => {
    const finalConfig: chatSupportConfig = structuredClone(config);
    if (merchantRegistrationId)
      finalConfig.merchantRegistrationId = merchantRegistrationId;

    establishSocketConnection(finalConfig, socketRef, (data: any) => {
      const chatData = JSON.parse(data.data);
      socketEventsProcessor(
        chatData,
        (data, messageType) => {
          handleSocketMsg(data, messageType, chatDispatcher, merchantId);
          setConfig(
            produce((draft) => {
              if (data.totalResults) {
                draft.totalResults = data.totalResults;
              }
            }),
          );
          const details = _.pick(data, ["unreadMsgCount"]);
          chatDispatcher.updateDetails(details);
          if (data.isReconnectionReq) {
            connectionReestablisherEvent.current &&
              checkOpenConnection(socketRef.current) &&
              sendSocketData(
                socketRef.current,
                connectionReestablisherEvent.current.event,
                connectionReestablisherEvent.current.data,
              );
            connectionReestablisherEvent.current = null;
          }
        },
        chatDispatcher,
      );
    });
    return () => {
      socketRef.current && socketRef.current.close();
    };
  }, [
    merchantRegistrationId,
    config.reestablishConnection,
    config.socketTrigger,
  ]);

  return [
    socketRef,
    chatDispatcher.dataDispatcher,
    config,
    setConfig,
    connectionReestablisherEvent,
  ];
};

export default useDataManager;
