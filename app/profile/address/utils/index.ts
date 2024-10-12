import { errorToast, infoToast, toastErrorIcons } from "@/app/_utils/toast";
import {
  drawerVal,
  drawerValidation,
  queryLocationResp,
} from "./interfaces-enums-default vals-schemas";
import { getZodErrMsg } from "@/app/_utils";
import { ProfileDispatch } from "@/lib/profile/store";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";
export * from "./interfaces-enums-default vals-schemas";
export * from "./apis";

export const processQueryLocations = (data: queryLocationResp[]) => {
  return data.map(
    ({
      geometry: {
        location: { lat, lng },
      },
      description,
      place_id,
    }: queryLocationResp) => {
      return {
        id: place_id,
        lat,
        lng,
        label: description,
      };
    },
  );
};

export const saveDrawerDetails = (
  details: drawerVal,
  onOpenChange: () => void,
  dispatch: ProfileDispatch,
) => {
  const data = drawerValidation.safeParse(details);
  if (data.error) {
    const errMsg = getZodErrMsg(data.error);
    errorToast({ msg: errMsg, iconType: toastErrorIcons.validation });
    return;
  }
  dispatch(setAddressDetails(structuredClone(details)));
  infoToast({
    msg: "Please click on save button on the right bottom of the map to save address details",
  });
  onOpenChange();
};
