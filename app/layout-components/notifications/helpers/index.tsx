import { modalPropsInterface } from "@/lib/main/slices/notification/notification.slice";
import { Dispatch, SetStateAction } from "react";

export interface notificationConfig {
  placement: modalPropsInterface["placement"];
}

export type setNotificationConfig = Dispatch<
  SetStateAction<notificationConfig>
>;
