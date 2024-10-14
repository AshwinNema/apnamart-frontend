import { MainMap } from "@/app/_custom-components/leaflet/map-component";
import { useProfileSelector } from "@/lib/profile/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardBody } from "@nextui-org/react";
import * as _ from "lodash";
import { setMultiplePaths } from "@/app/_utils";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { getAddress } from "@/app/profile/address/utils";
import {
  EventHandlerAndMarker,
  componentTypes,
  AddressDisplayState,
  MainCardComponent,
} from "@/app/profile/shared-components/shared-map";

export default function PickUpAddress() {
  const merchantDetails = useProfileSelector((state) => state.merchantDetails);
  const [config, setConfig] = useState<AddressDisplayState>({
    flyToLocation: null,
    fly: false,
    isAddLoaded: false,
    address: "",
  });

  const getLocationAddress = useCallback(
    _.debounce((lat: number, lng: number) => {
      getAddress({ lat, lng }, setMultiplePaths(setConfig));
    }, 500),
    [],
  );

  useEffect(() => {
    getLocationAddress(merchantDetails.latitude, merchantDetails.longtitude);
  }, [merchantDetails.latitude, merchantDetails.longtitude]);

  const displayMap = useMemo(
    () => (
      <MainMap
        center={[merchantDetails.latitude, merchantDetails.longtitude]}
        zoom={merchantDetails.zoom}
        className="h-[40vh] min-h-[250px]"
        scrollWheelZoom={true}
      >
        <EventHandlerAndMarker
          componentType={componentTypes.merchantRegistration}
          getLocationAddress={getLocationAddress}
          flyToLocation={config.flyToLocation}
          fly={config.fly}
          setMultipleData={setMultiplePaths(setConfig)}
          disallowMarkerDrag={
            merchantDetails.registrationStatus ===
            merchantRegistrationStatus.adminReview
          }
        />
      </MainMap>
    ),
    [
      merchantDetails.latitude,
      merchantDetails.longtitude,
      config.flyToLocation,
    ],
  );
  return (
    <>
      <MainCardComponent
        componentType={componentTypes.merchantRegistration}
        config={config}
        setMultipleData={setMultiplePaths(setConfig)}
      />
      <CardBody>{displayMap}</CardBody>
    </>
  );
}
