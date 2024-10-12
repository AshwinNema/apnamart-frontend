import { toastErrorIcons } from "@/app/_utils/toast";
import { getLocalStorageKey, storageAttributes } from "../web-storage.service";
import { getRefreshToken } from "./refresh-token";
import { ReactNode } from "react";

export enum HTTP_METHODS {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface token {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

export interface params {
  [key: string]: number | string | boolean;
}

export interface errHandling {
  showToastAndRedirect?: boolean;
  iconType?: toastErrorIcons;
  throwErr?: boolean;
}

export interface fetchConfig extends errHandling {
  showLoader?: boolean;
  showToast?: boolean;
  addToken?: boolean;
  successMsg?: ReactNode;
}

export interface uploadRespHandling extends errHandling {
  successMsg: ReactNode;
  successCallback?: (...args: any[]) => any;
}

export const getToken = async () => {
  const tokens: token = getLocalStorageKey<token>(storageAttributes.tokens);

  if (!tokens) {
    return;
  }

  const expiredAt =
    tokens && tokens.access && tokens.access.expires
      ? new Date(tokens.access.expires)
      : new Date(1971);
  expiredAt.setMinutes(expiredAt.getMinutes() - 1);

  if (expiredAt > new Date()) {
    return tokens.access.token;
  }

  return await getRefreshToken(tokens.refresh.token);
};

export const addQuery = (params?: params) => {
  if (params) {
    const query = Object.keys(params)
      .map(
        (k: string) =>
          encodeURIComponent(k) + "=" + encodeURIComponent(params[k]),
      )
      .join("&");
    return "?" + query;
  }

  return "";
};
