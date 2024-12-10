import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";

export const checkIsAreaDeliverable = (
  latLng: {
    latitude: number;
    longtitude: number;
  },
  onSuccess?: () => void,
  onFailure?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    appEndPoints.CHECK_IS_AREA_DELIVERABLE,
    undefined,
    latLng,
  )
    .then((res) => {
      if (!res) return;
      !!res.isAreaDeliverable && onSuccess && onSuccess();
      !res.isAreaDeliverable && onFailure && onFailure();
    })
    .catch(() => {
      onFailure && onFailure();
    });
};
