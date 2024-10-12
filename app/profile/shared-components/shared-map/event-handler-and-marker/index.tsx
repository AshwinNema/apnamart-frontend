import { Marker, useMapEvents } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { GlowingMarker } from "@/app/_custom-components";
import { useProfileDispatch } from "@/lib/profile/hooks";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";
import { componentTypes, EventHandlerAndMarkerProps } from "../index";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";

export default function EventHandlerAndMarker({
  getLocationAddress,
  flyToLocation,
  fly,
  setMultipleData,
  componentType,
  disallowMarkerDrag,
}: EventHandlerAndMarkerProps) {
  const dispatch = useProfileDispatch();
  const icon = useMemo(() => {
    let iconHtml = renderToString(<GlowingMarker />);
    if (componentType === componentTypes.merchantRegistration) {
      iconHtml = iconHtml.replace(
        "Your order will be delivered here",
        "Your items will be picked up from here",
      );
    }
    return new DivIcon({
      html: iconHtml,
    });
  }, [componentType]);

  const dispatchDetails = (details: object) => {
    switch (componentType) {
      case componentTypes.merchantRegistration:
        dispatch(setMerchantDetails(details));
        return;
      case componentTypes.profileAddress:
        dispatch(setAddressDetails(details));
        return;
      default:
        return;
    }
  };

  const setLatLng = (lat: string | number, lng: string | number) => {
    dispatchDetails({
      latitude: lat,
      longtitude: lng,
    });
  };

  const map = useMapEvents({
    drag() {
      if (disallowMarkerDrag) return;
      const newLatLng = new L.LatLng(
        map.getCenter().lat,
        map.getCenter().lng || 0,
      );
      setPosition(newLatLng);
    },
    locationfound(e) {
      if (disallowMarkerDrag) return;
      setPosition(e.latlng);
      map.flyTo(e.latlng);
      const { lat, lng } = e.latlng;
      setLatLng(lat, lng);
      getLocationAddress(lat, lng);
    },
    dragend(event) {
      if (disallowMarkerDrag) return;
      const { lat, lng } = event.target.getCenter();
      getLocationAddress(lat, lng);
      setLatLng(lat, lng);
    },
    moveend(event) {
      if (disallowMarkerDrag) return;
      const { lat, lng } = event.target.getCenter();
      const newLatLng = new L.LatLng(lat, lng);
      setPosition(newLatLng);
      getLocationAddress(lat, lng);
      setLatLng(lat, lng);
    },
    zoom(event) {
      if (disallowMarkerDrag) return;
      dispatchDetails({
        zoom: event.target._zoom,
      });
    },
  });

  const [position, setPosition] = useState(
    new L.LatLng(map.getCenter().lat, map.getCenter().lng),
  );

  useEffect(() => {
    if (!flyToLocation || !fly) return;
    const [lat, lng] = flyToLocation;
    const latLng = new L.LatLng(lat, lng);
    getLocationAddress(lat, lng);
    map.flyTo(latLng);
    map.setView(latLng);
    setMultipleData([["fly", false]]);
    setLatLng(lat, lng);
    setPosition(latLng);
  }, [flyToLocation, map, fly]);

  return <Marker position={position} icon={icon} />;
}
