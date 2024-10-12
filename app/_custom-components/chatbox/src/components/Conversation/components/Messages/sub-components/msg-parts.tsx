import { browserTheme } from "@/app/layout-components/theme-switch";
import { useTheme } from "next-themes";
import { Fragment } from "react";
import React from "react";
import { MdAccessTime, MdCheck, MdDoneAll } from "react-icons/md";
import { format } from "date-fns";
import {
  messageBoxStatusTypes,
  messageBoxType,
} from "../../../../../utils/interfaces & types & constants";
import { SiTicktick } from "react-icons/si";

export const SystemComponent = ({ text }: { text: string }) => {
  const { theme } = useTheme();
  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <div
          className={`relative rounded-[10px] shadow-systemComponentShadow flex flex-col my-1.5 pt-1.5 pr-2.5 pb-2 pl-2.5 float-left max-w-[70%] items-center justify-center ${
            theme === browserTheme.dark && "bg-darkContainerTheme"
          }`}
        >
          <div className="text-center text-[15px] inline-block opacity-50 text-supSmall">
            {text}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const MessageBox: React.FC<messageBoxType> = (props) => {
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
                "flex items-center justify-end text-right opacity-50 right-[-4px] bottom-[-5px] gap-3 mt-2 text-[10px]"
              }
            >
              {format(props.date, "hh:mm")}
              {props.hideStatus ? null : (
                <span className="scale-[1.5]">
                  {props.status === messageBoxStatusTypes.notReceived && (
                    <MdAccessTime />
                  )}

                  {props.status === messageBoxStatusTypes.sent && <MdCheck />}

                  {props.status === messageBoxStatusTypes.delivered && (
                    <MdDoneAll />
                  )}
                  {props.status === messageBoxStatusTypes.read && (
                    <SiTicktick fill="green" className="scale-90" />
                  )}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
