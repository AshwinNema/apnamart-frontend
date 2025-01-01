import { GlowingMarker } from "@/app/_custom-components";
import L, { DivIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { Marker, useMapEvents } from "react-leaflet";
import { addressConfig, setAddressConfig } from "../../helpers";
import { produce } from "immer";

export const LocationMarker = ({
  setConfig,
  config,
}: {
  setConfig: setAddressConfig;
  config: addressConfig;
}) => {
  const icon = useMemo(() => {
    let iconHtml = renderToString(<GlowingMarker />);
    return new DivIcon({
      html: iconHtml,
    });
  }, []);

  const map = useMapEvents({
    drag() {
      setMarkerPosition();
    },
    moveend() {
      setMarkerPosition();
    },
  });
  const [position, setPosition] = useState(
    new L.LatLng(map.getCenter().lat, map.getCenter().lng),
  );

  const setMarkerPosition = () => {
    const { lat, lng } = map.getCenter();
    setPosition(new L.LatLng(lat, lng));
    setConfig(
      produce((draft) => {
        draft.details.latitude = map.getCenter().lat;
        draft.details.longtitude = map.getCenter().lng;
      }),
    );
  };

  useEffect(() => {
    setMarkerPosition();
  }, [map]);

  useEffect(() => {
    if (!config.fly || !config.flyToLocation) return;
    const [lat, lng] = config.flyToLocation;
    const latLng = new L.LatLng(lat, lng);
    map.flyTo(latLng);
    map.setView(latLng);
    setPosition(latLng);
    setConfig(
      produce((draft) => {
        draft.flyToLocation = null;
        draft.fly = false;
        draft.details.latitude = lat;
        draft.details.longtitude = lng;
      }),
    );
  }, [config.fly, config.flyToLocation, map]);

  return <Marker position={position} icon={icon} />;
};
