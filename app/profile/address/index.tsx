"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useState, useMemo, useEffect, useCallback } from "react";
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
export default function UserAddress() {
  const addressDetails = useProfileSelector((state) => state.addressDetails);
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
        className="h-[40vh] min-h-[250px]"
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

  return (
    <>
      <Card>
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
