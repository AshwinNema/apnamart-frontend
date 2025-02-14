"use client";
import { Card, CardBody } from "@heroui/react";
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { MainMap } from "../../_custom-components";
import { setMultiplePaths } from "@/app/_utils";
import { getAddress } from "./utils";
import * as _ from "lodash";
import AddressFooter from "./components/address-details";
import { useProfileSelector } from "@/lib/profile/hooks";
import {
  componentTypes,
  EventHandlerAndMarker,
  MainCardComponent,
} from "../shared-components/shared-map";
import { AddressDisplayState as config } from "../shared-components/shared-map";
import { MainProfileStateContext } from "../utils";
export default function UserAddress() {
  const addressDetails = useProfileSelector((state) => state.addressDetails);
  const maincontext = useContext(MainProfileStateContext);
  const [config, setConfig] = useState<config>({
    flyToLocation: null,
    fly: false,
    isAddLoaded: false,
    address: "",
  });

  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const getLocationAddress = useCallback(
    _.debounce((lat: number, lng: number) => {
      getAddress({ lat, lng }, setMultipleData);
    }, 500),
    [],
  );

  useEffect(() => {
    getLocationAddress(addressDetails.latitude, addressDetails.longtitude);
  }, [addressDetails.latitude, addressDetails.longtitude]);

  const displayMap = useMemo(
    () => (
      <MainMap
        className="h-[40svh] min-h-[250px]"
        center={[addressDetails.latitude, addressDetails.longtitude]}
        zoom={addressDetails.zoom}
        scrollWheelZoom={true}
      >
        <EventHandlerAndMarker
          componentType={componentTypes.profileAddress}
          getLocationAddress={getLocationAddress}
          flyToLocation={config.flyToLocation}
          fly={config.fly}
          setMultipleData={setMultipleData}
        />
      </MainMap>
    ),
    [addressDetails.latitude, addressDetails.longtitude, config.flyToLocation],
  );
  if (!maincontext) return null;
  return (
    <>
      <Card
        radius={`${maincontext.config.width > 750 ? "lg" : "none"}`}
        shadow={`${maincontext.config.width > 750 ? "md" : "none"}`}
      >
        <MainCardComponent
          componentType={componentTypes.profileAddress}
          setMultipleData={setMultipleData}
          config={config}
        />
        <CardBody>{displayMap}</CardBody>
        <AddressFooter />
      </Card>
    </>
  );
}
