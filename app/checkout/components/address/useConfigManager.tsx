import { useCallback, useContext, useEffect, useState } from "react";
import * as _ from "lodash";
import {
  addressConfig,
  getDefaultAddressConfig,
  setAddressConfig,
  MainContext,
  getDefaultConfig,
} from "../../helpers";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { getAddress } from "@/app/profile/address/utils";

const useConfigManager = (): [addressConfig, setAddressConfig] => {
  const [config, setConfig] = useState<addressConfig>(
    getDefaultAddressConfig(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  const context = useContext(MainContext);
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const getLocationAddress = useCallback(
    _.debounce((lat: number, lng: number) => {
      getAddress({ lat, lng }, setMultipleData);
    }, 500),
    [],
  );

  useEffect(() => {
    if (!context?.config?.address?.id) return;
    const keys = Object.keys(getDefaultConfig().address);
    const addressData = _.pick(context?.config?.address, keys);
    setData("details")(addressData);
  }, [context?.config?.address?.id]);

  useEffect(() => {
    getLocationAddress(config.details.latitude, config.details.longtitude);
  }, [config.details.latitude, config.details.longtitude]);

  return [config, setConfig];
};

export default useConfigManager;
