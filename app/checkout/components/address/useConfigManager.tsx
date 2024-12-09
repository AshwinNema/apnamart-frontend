import { useCallback, useEffect, useState } from "react";
import * as _ from "lodash";
import {
  addressConfig,
  getDefaultAddressConfig,
  setInitialAddress,
  setAddressConfig,
} from "../../helpers";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { getAddress } from "@/app/profile/address/utils";
import { useAppSelector } from "@/lib/main/hooks";

const useConfigManager = (): [addressConfig, setAddressConfig] => {
  const [config, setConfig] = useState<addressConfig>(
    getDefaultAddressConfig(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const address = useAppSelector((state) => state?.user?.address);
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const getLocationAddress = useCallback(
    _.debounce((lat: number, lng: number) => {
      getAddress({ lat, lng }, setMultipleData);
    }, 500),
    [],
  );

  useEffect(() => {
    setInitialAddress(setData("details"), address);
  }, [address]);

  useEffect(() => {
    getLocationAddress(config.details.latitude, config.details.longtitude);
  }, [config.details.latitude, config.details.longtitude]);

  return [config, setConfig];
};

export default useConfigManager;
