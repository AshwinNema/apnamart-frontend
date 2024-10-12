import { format } from "date-fns";
import { messagesState } from "./interfaces & types & constants/store-types";
export * from "./interfaces & types & constants";

export const formatChatBoxDate = (date: Date) => {
  return format(new Date(date), "dd-MMMM-yyyy").split("-").join(" ");
};

export const assignDateKey = (
  id: string | number,
  date: Date,
  firstDayMap: messagesState["firstDayMap"],
) => {
  const formattedDate = formatChatBoxDate(date);
  const curFirstDay = firstDayMap[formattedDate];
  const curTime = new Date(curFirstDay?.time || new Date());

  if (curTime.getTime() > new Date(date).getTime()) {
    firstDayMap[formattedDate] = {
      id,
      time: date,
    };
  }
};
