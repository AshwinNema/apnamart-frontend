"use client";
import { MainMap } from "@/app/_custom-components/leaflet";
import { setNestedPath } from "@/app/_utils";
import { Button } from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { MapAccessComponent } from "./map-features";

export default function DeliveryMap({
  onLoadComplete,
}: {
  onLoadComplete: () => void;
}) {
  const [config, setConfig] = useState({
    saveMapState: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const deliveryMap = useMemo(() => {
    return (
      <MainMap
        center={[12.923946516889448, 77.5526110768168]}
        className="h-[70vh] min-h-[250px]"
        zoom={5}
        scrollWheelZoom={true}
      >
        <MapAccessComponent
          saveMapState={config.saveMapState}
          setData={setData}
          onLoadComplete={onLoadComplete}
        />
      </MainMap>
    );
  }, [config.saveMapState]);
  return (
    <>
      <div>{deliveryMap}</div>
      <div className="flex justify-end mt-3">
        <Button
          color="success"
          className="text-white"
          endContent={<FaMapLocationDot className="scale-[1.3]" />}
          onPress={() => {
            setData("saveMapState")(true);
          }}
        >
          {" "}
          Save
        </Button>{" "}
      </div>
    </>
  );
}
