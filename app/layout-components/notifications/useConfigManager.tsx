import {
  modalProps,
  notificationTypes,
} from "@/lib/main/slices/notification/notification.slice";
import { useEffect, useState } from "react";
import { notificationConfig } from "./helpers";
import { useAppSelector } from "@/lib/main/hooks";
import { produce } from "immer";

const useConfigManager = () => {
  const [config, setConfig] = useState<notificationConfig>({
    placement: modalProps.placement,
  });

  const placement = useAppSelector(
    (state) => state.notifications.modalProps.placement,
  );
  const notificationType = useAppSelector((state) => state.notifications.type);

  useEffect(() => {
    setConfig(
      produce((draft) => {
        draft.placement = placement;
      }),
    );
  }, [placement]);

  useEffect(() => {
    const checkResize = () => {
      if (notificationType !== notificationTypes.logout) return;
      setConfig(
        produce((draft) => {
          if (window.innerWidth < 700) {
            draft.placement = "center";
            return;
          }
          draft.placement = "top-center";
        }),
      );
    };

    checkResize();
    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, [notificationType]);
  return [config];
};

export default useConfigManager;
