import { setKeyVal, setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  createUpdateDescriptionState,
  defaultCreateUpdateDescriptionState,
  descriptionStateEvents,
  MainCreateUpdateProductContext,
  resetCreateUpdateDescriptionState,
  setCreateUpdateDescriptionState,
  setInitialDescriptionState,
} from "@/app/merchant/products/helpers";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Subject } from "rxjs";

const useManageState = ({
  isOpen,
}: {
  isOpen?: boolean;
}): [
  createUpdateDescriptionState,
  setCreateUpdateDescriptionState,
  setKeyVal,
  Subject<descriptionStateEvents>,
] => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const descriptionEventsEmitter = useMemo(
    () => new Subject<descriptionStateEvents>(),
    [],
  );
  const [config, setConfig] = useState<createUpdateDescriptionState>(
    defaultCreateUpdateDescriptionState(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    if (!mainContext?.config?.descriptionType) return;
    resetCreateUpdateDescriptionState(
      mainContext?.config?.descriptionType,
      config.seriesDescriptionType,
      setMultiplePaths(setConfig),
      isOpen,
    );
  }, [mainContext?.config?.descriptionType, isOpen]);

  useEffect(() => {
    if (!mainContext) return;
    setInitialDescriptionState(
      mainContext?.config,
      setConfig,
      mainContext?.setConfig,
      descriptionEventsEmitter,
    );
  }, [mainContext?.config?.updateDescriptionDetails]);

  return [config, setConfig, setData, descriptionEventsEmitter];
};

export default useManageState;
