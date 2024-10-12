import { errorToast, toastErrorIcons } from "@/app/_utils";

// Note : Majority of the exports from here do not support ssr , hence please do consider loading component lazily with ssr:false,
// or do not directly import from here do import from nested for example - interfaces & enums  can be imported nestedly

// Note : This function is  used in following :
// app/profile/merchant-registration/pickup-address/main-card.tsx
// app/profile/address/components/main-card.tsx

export async function getUserLocation(
  successCallback: (latLng: [number, number]) => any,
) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        successCallback([latitude, longitude]);
      },
      (error) => {
        switch (error.code) {
          case 1:
            errorToast({
              msg: "You have to enable location access in the browser first in order to enable map to find your location",
              iconType: toastErrorIcons.locationDenied,
            });
            break;

          case 2:
            errorToast({
              msg: "Sorry something internally went wrong",
              iconType: toastErrorIcons.browserDenied,
            });
            break;

          default:
            errorToast({
              msg: "Sorry something went wrong",
            });
            break;
        }
      },
      {
        enableHighAccuracy: true,
      },
    );
  }
}

export * from "./interfaces & enums";
export { default as LocationAutoCompleteInput } from "./auto-complete";
export { default as MainCardComponent } from "./main-card";
export { default as EventHandlerAndMarker } from "./event-handler-and-marker";
