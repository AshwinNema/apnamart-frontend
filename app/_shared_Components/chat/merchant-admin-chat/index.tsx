import { Chatbox } from "@/app/_custom-components";
import { MdOutlineSupportAgent } from "react-icons/md";
import {
  sendChatMsg,
  getInitialMsgs,
  queryChatMsgs,
  markMsgAsRead,
} from "./helpers";

import * as _ from "lodash";
import useDataManager from "./hooks/useDataManager";
import useReconnectSocket from "./hooks/useReconnectSocket";

const MerchantAdminChatSupport = ({
  merchantRegistrationId,
  merchantId,
}: {
  merchantRegistrationId?: number;
  merchantId?: number;
}) => {
  const [socketRef, dataDispatcher, config, setConfig] = useDataManager(
    merchantRegistrationId,
    merchantId,
  );
  const [reconnectSocket] = useReconnectSocket({ dataDispatcher, setConfig });

  return (
    <Chatbox
      dataDispatcher={dataDispatcher}
      getPrevMsgs={(firstMsgId, msgLength) => {
        const allMsgsFetched = config.totalResults <= msgLength;
        if (allMsgsFetched) return;

        queryChatMsgs(
          socketRef.current,
          {
            cursor: firstMsgId as number,
            limit: config.limit,
          },
          reconnectSocket,
        );
      }}
      title={
        <div className="flex items-center gap-4 justify-center">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <MdOutlineSupportAgent />
            </div>

            <div>Technical Support</div>
          </div>
        </div>
      }
      markMsgAsRead={(id) => {
        markMsgAsRead(socketRef.current, id as number, reconnectSocket);
      }}
      subtitle=""
      resizable={true}
      initialMessages={getInitialMsgs()}
      customAddMsg={(msg) => {
        sendChatMsg(socketRef.current, msg, reconnectSocket);
      }}
    />
  );
};

export default MerchantAdminChatSupport;
