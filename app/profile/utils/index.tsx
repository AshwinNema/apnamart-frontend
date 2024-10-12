"use client";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { AppDispatch } from "@/lib/main/store";
import {
  getSessionStorageKey,
  sessionStorageAttributes,
  setSessionStorageKey,
} from "../../_services";
import { handleAction } from "../../layout-components/notifications/merchant-registration";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { createContext } from "react";
import { z } from "zod";
import { passwordErrMsg, passwordRegex } from "@/app/_utils";
export * from "./tabs";

export interface mainProfileState {
  businessRegistrationFile: FileUploadWithPreview | null;
}

export interface MainProfileStateContextInterface {
  config: mainProfileState;
  setConfig: Dispatch<SetStateAction<mainProfileState>>;
}

export const MainProfileStateContext =
  createContext<MainProfileStateContextInterface | null>(null);

export interface tabOption {
  title: ReactNode;
  Content: (props: any) => React.JSX.Element;
  key: tabKeys;
  additionalTabClass?: string;
}

export const checkMerchantRegistration = (
  user: UserInterface,
  dispatch: AppDispatch,
) => {
  const role = user?.role;
  if (role !== UserRole.merchant) return;
  const isRegistreationStarted = user?.merchantDetails?.id;
  if (isRegistreationStarted) return;
  const isRegistrationNotificationShown = getSessionStorageKey(
    sessionStorageAttributes.pendingMerchantRegistration,
  );
  if (isRegistrationNotificationShown) return;
  setSessionStorageKey(
    sessionStorageAttributes.pendingMerchantRegistration,
    true,
  );
  dispatch(handleAction());
};

export const getUpdateUserDetailsSchema = (type: tabKeys) => {
  return type == tabKeys.settings
    ? z.object({
        password: z.string().regex(passwordRegex, {
          message: passwordErrMsg,
        }),
      })
    : z.object({
        name: z.string(),
        email: z.string().email(),
      });
};
