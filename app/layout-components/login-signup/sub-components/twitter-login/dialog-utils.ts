"use client";
import { HTTP_METHODS, makeDataRequest, params } from "@/app/_services";

export function openPopup(dialogWidth: number, dialogHeight: number) {
  const left = Math.max(screen.width / 2 - dialogWidth / 2, 0);
  const top = Math.max(screen.height / 2 - dialogHeight / 2, 0);
  return window.open(
    "",
    "",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
      dialogWidth +
      ", height=" +
      dialogHeight +
      ", top=" +
      top +
      ", left=" +
      left,
  );
}

function getOauthToken(
  loginUrl: string,
  oAuthVerifier: string,
  oauthToken: string,
  onSuccess?: (...args: any) => void,
  onFailure?: (...args: any) => void,
  additonalAcessParams?: params,
) {
  makeDataRequest(
    HTTP_METHODS.POST,
    loginUrl,
    undefined,
    {
      oauth_verifier: oAuthVerifier,
      oauth_token: oauthToken,
      ...additonalAcessParams,
    },
    {
      throwErr: true,
    },
  )
    .then((response) => {
      if (!response) {
        return;
      }
      onSuccess && onSuccess(response);
    })
    .catch((err) => {
      onFailure && onFailure(err);
    });
}

export const polling = (
  loginUrl: string,
  popup: Window | null,
  onSuccess?: (...args: any) => void,
  onFailure?: (...args: any) => void,
  additonalAcessParams?: params,
) => {
  const polling = setInterval(function () {
    if (!popup || popup.closed || popup.closed === undefined) {
      clearInterval(polling);
      onFailure && onFailure(new Error("Popup has been closed by user"));
    }
    const closeDialog = function closeDialog() {
      clearInterval(polling);
      popup?.close?.();
    };
    try {
      if (
        !popup?.location?.hostname.includes("api.twitter.com") &&
        !(popup?.location?.hostname == "")
      ) {
        if (popup?.location.search) {
          const query = new URLSearchParams(popup?.location?.search);
          const oathToken = query.get("oauth_token") as string;
          const oauthVerifier = query.get("oauth_verifier") as string;
          closeDialog();
          return getOauthToken(
            loginUrl,
            oauthVerifier,
            oathToken,
            onSuccess,
            onFailure,
            additonalAcessParams,
          );
        } else {
          closeDialog();
          onFailure &&
            onFailure(
              new Error(
                "OAuth redirect has occurred but no query or hash parameters were found. " +
                  "They were either not set during the redirect, or were removed—typically by a " +
                  "routing library—before Twitter react component could read it.",
              ),
            );
        }
      }
    } catch (err) {}
  }, 500);

  return polling;
};
