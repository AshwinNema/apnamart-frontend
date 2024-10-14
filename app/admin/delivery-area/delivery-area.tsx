"use client";
import { MainMap } from "@/app/_custom-components/leaflet";
import { setNestedPath } from "@/app/_utils";
import { Button } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import {
  addNewArea,
  deleteMapAreas,
  featureGroupAreas,
  updateMapAreas,
  mapProps,
  updateMapState,
  getAllDeliveryAreas,
  MapLayerGroup,
} from "./utils";
import { FaMapLocationDot } from "react-icons/fa6";

const MapAccessComponent = ({ saveMapState, setData }: mapProps) => {
  const [features, setFeatures] = useState<featureGroupAreas>({
    created: {},
    deleted: [],
    current: {},
  });
  const featureGroupRef = useRef(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      getAllDeliveryAreas(
        setFeatures,
        featureGroupRef.current! as MapLayerGroup,
      );
    }
  }, []);

  useEffect(() => {
    if (!saveMapState) return;
    setData("saveMapState", false)();
    const allLayers = featureGroupRef.current! as MapLayerGroup;
    updateMapState(features, allLayers, setFeatures);
  }, [saveMapState]);
  return (
    <FeatureGroup ref={featureGroupRef}>
      <EditControl
        position="topright"
        draw={{
          circlemarker: false,
          marker: false,
          polyline: false,
          rectangle: false,
          polygon: false,
        }}
        edit={{
          featureGroup: {
            circlemarker: false,
            marker: false,
            polyline: false,
          },
        }}
        onCreated={(e) => {
          addNewArea(e.layer, setFeatures);
        }}
        onEdited={(e) => {
          updateMapAreas(e.layers._layers, setFeatures);
        }}
        onDeleted={(e) => {
          deleteMapAreas(e.layers._layers, setFeatures);
        }}
      />
    </FeatureGroup>
  );
};

export default function DeliveryMap() {
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
