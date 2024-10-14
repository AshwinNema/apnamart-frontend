import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import {
  LayerCircle,
  featureGroupAreas,
  mapApiLayerInfo,
  MapLayerGroup,
} from "./interfaces";
import { appEndPoints } from "@/app/_utils/endpoints";
import { errorToast, successToast } from "@/app/_utils/toast";
import { Dispatch, SetStateAction } from "react";
import L from "leaflet";

export const updateMapState = (
  data: featureGroupAreas,
  allLayers: MapLayerGroup,
  setFeatures: Dispatch<SetStateAction<featureGroupAreas>>,
) => {
  const { created, deleted, current } = data;
  const newAreas = Object.entries(created).map(([_, val]) => {
    const { radius, lat: latitude, lng: longtitude } = val;
    return {
      radius,
      latitude,
      longtitude,
    };
  });

  const update = Object.entries(current).map(([_, val]) => {
    const { radius, lat: latitude, lng: longtitude, dbId: id } = val;
    return {
      id,
      radius,
      latitude,
      longtitude,
    };
  });

  const body = {
    created: newAreas,
    update,
    deleted,
  };

  makeDataRequest(HTTP_METHODS.PUT, appEndPoints.UPDATE_DELIVERY_AREA, body)
    .then((res) => {
      if (!res) return;
      successToast({ msg: "Delivery location updated successfully" });
      if (newAreas.length) {
        setTimeout(() => {
          getAllDeliveryAreas(setFeatures, allLayers);
        }, 300);
        return;
      }
      setFeatures((prevFeatures) => ({ ...prevFeatures, deleted: [] }));
    })
    .catch((err) => {
      errorToast({ msg: err.msg });
    });
};

export const getAllDeliveryAreas = (
  setFeatures: Dispatch<SetStateAction<featureGroupAreas>>,
  allLayers: MapLayerGroup,
) => {
  makeDataRequest(HTTP_METHODS.GET, appEndPoints.GET_ALL_DELIVERY_AREAS).then(
    (res) => {
      if (!res) return;
      allLayers.clearLayers();
      const currentMap = res.reduce(
        (map: featureGroupAreas["current"], layer: mapApiLayerInfo) => {
          const { id, latitude, longtitude, radius: rad } = layer;
          const lat = parseFloat(latitude);
          const lng = parseFloat(longtitude);
          const radius = parseFloat(rad);
          const area = new L.Circle(L.latLng(lat, lng), radius) as LayerCircle;
          allLayers.addLayer(area);
          const leafletId = area._leaflet_id;
          map[leafletId] = {
            dbId: id,
            lat,
            lng,
            radius: radius,
          };
          return map;
        },
        {},
      );

      setFeatures({
        created: {},
        deleted: [],
        current: currentMap,
      });
    },
  );
};
