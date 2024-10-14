import { browserTheme } from "@/app/layout-components/theme-switch";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { openPopup, polling } from "./dialog-utils";
import { HTTP_METHODS, makeDataRequest, params } from "@/app/_services";
import { BsTwitterX } from "react-icons/bs";

export default function TwitterLogin({
  text,
  dialogWidth = 600,
  dialogHeight = 400,
  loginUrl,
  onSuccess,
  onFailure,
  requestTokenUrl,
  additonalAcessParams,
}: {
  text: string;
  dialogWidth?: number;
  dialogHeight?: number;
  loginUrl: string;
  onSuccess?: (...args: any) => void;
  onFailure?: (...args: any) => void;
  requestTokenUrl: string;
  additonalAcessParams?: params;
}) {
  const { theme } = useTheme();
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof pollingRef.current === "number") {
      pollingRef.current = null;
    }
  }, [pollingRef.current]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const twitterLogin = async () => {
    const popup = openPopup(dialogWidth, dialogHeight);

    try {
      makeDataRequest(
        HTTP_METHODS.POST,
        requestTokenUrl,
        undefined,
        undefined,
        {
          throwErr: true,
        },
      ).then((data) => {
        const authenticationUrl =
          "https://api.twitter.com/oauth/authenticate?oauth_token=" +
          data.oauth_token +
          "&force_login=" +
          "false";
        popup!.location = authenticationUrl;
        pollingRef.current = polling(
          loginUrl,
          popup,
          onSuccess,
          onFailure,
          additonalAcessParams,
        );
      });
    } catch (err) {
      popup?.close();
      onFailure && onFailure(err);
    }
  };

  return (
    <Button
      variant="faded"
      className={`font-bold ${theme === browserTheme.dark && "bg-white text-black"} `}
      startContent={<BsTwitterX className="scale-150" />}
      isDisabled={pollingRef.current !== null}
      onPress={twitterLogin}
    >
      {text}
    </Button>
  );
}
