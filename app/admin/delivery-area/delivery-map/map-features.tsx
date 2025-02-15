import { useEffect, useRef, useState } from "react";
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
} from "../utils";

export const MapAccessComponent = ({
  saveMapState,
  setData,
  onLoadComplete,
}: mapProps) => {
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
        onLoadComplete,
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
