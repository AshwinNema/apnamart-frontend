import React from "react";
import { MdAccessTime, MdCheck, MdDoneAll } from "react-icons/md";
import { format } from "date-fns";
import {
  messageBoxStatusTypes,
  messageBoxType,
} from "../../utils/interfaces & types & constants";

const MessageBox: React.FC<messageBoxType> = (props) => {
  const isRightAligned = props.position === "right";
  return (
    <div>
      <div
        className={`rounded-lg relative  mx-5 px-3 py-1 ${
          isRightAligned ? "float-right" : "float-left"
        } ${props.msgBoxClass}`}
      >
        <div>
          <div className="break-all">{props.text}</div>
          {props.hideSeenAndStatus ? null : (
            <div
              className={
                "flex items-center justify-end text-right opacity-50 text-[8px] right-[-4px] bottom-[-5px] gap-1 mt-2"
              }
            >
              {format(props.date, "hh:mm")}

              <span className="scale-[1.3]">
                {props.status === messageBoxStatusTypes.notReceived && (
                  <MdAccessTime />
                )}

                {props.status === messageBoxStatusTypes.sent && <MdCheck />}

                {props.status === messageBoxStatusTypes.delivered && (
                  <MdDoneAll />
                )}

                {props.status === messageBoxStatusTypes.read && (
                  <MdDoneAll color="#4FC3F7" />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
