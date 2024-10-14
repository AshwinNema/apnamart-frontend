import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as _ from "lodash";

export enum notificationTypes {
  newUser = "newUser",
  logout = "logout",
  merchantRegistration = "merchantRegistration",
}

export interface modalPropsInterface {
  className: string;
  backdrop: "transparent" | "opaque" | "blur";
  scrollBehavior: "inside" | "normal" | "outside";
  placement:
    | "center"
    | "auto"
    | "top"
    | "top-center"
    | "bottom"
    | "bottom-center";
  hideCloseButton: boolean;
  isDismissable: boolean;
}

export interface notificationModal {
  type: notificationTypes | null;
  details: object | null;
  modalProps: modalPropsInterface;
}

export const modalProps: modalPropsInterface = Object.freeze({
  className: "max-h-[90vh] max-w-[40vw]",
  backdrop: "opaque",
  scrollBehavior: "inside",
  placement: "top-center",
  hideCloseButton: false,
  isDismissable: true,
});

const initialState: notificationModal = {
  type: null,
  details: null,
  modalProps,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    setNotificationType(
      state,
      action: PayloadAction<Partial<notificationModal>>,
    ) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setNotificationType } = notificationsSlice.actions;

export const resetNotifications = () => setNotificationType(initialState);
