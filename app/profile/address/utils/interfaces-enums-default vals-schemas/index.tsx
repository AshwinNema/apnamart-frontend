import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdOutlineWork } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { z } from "zod";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import * as _ from "lodash";
import { addressType } from "@/lib/profile/slices/address-slice";

export interface location {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export interface queryLocationResp {
  geometry: {
    location: { lat: number; lng: number };
  };
  description: string;
  place_id: string;
}

export const drawerInitialVal = {
  addressLine1: "",
  addressLine2: "",
  addressType: addressType.home,
  otherAddress: "",
};
export type drawerVal = typeof drawerInitialVal;

export const getInitialDrawerVals = (
  userAddress?: UserInterface["address"],
) => {
  const keys = Object.keys(drawerInitialVal);
  const vals = _.pick(userAddress || {}, keys) as drawerVal;

  return {
    ...drawerInitialVal,
    ...vals,
  };
};

export interface addressPayload extends drawerVal {
  latitude: number;
  longtitude: number;
}

export const drawerValidation = z
  .object({
    addressLine1: z
      .string({ message: "Flat No./ House No./Floor/ Building" })
      .min(1, "Flat No./ House No./Floor/ Building cannot be empty"),
    addressLine2: z
      .string({ message: "Road Name/ Area/ Colony" })
      .min(1, "Road Name/ Area/ Colony cannot be empty"),
    addressType: z.enum(
      [addressType.home, addressType.others, addressType.work],
      { message: "Location type is required" },
    ),
    otherAddress: z.string(),
  })
  .refine(
    (data) => {
      if (data.addressType === addressType.others)
        return data.otherAddress && data.otherAddress.trim().length > 0;
      return true;
    },
    {
      message: "Location type is required",
    },
  );

export const addressTypeList = [
  {
    type: addressType.home,
    label: "Home",
    icon: <BiSolidBuildingHouse />,
  },
  {
    type: addressType.work,
    label: "Work",
    icon: <MdOutlineWork />,
  },
  {
    type: addressType.others,
    label: "Others",
    icon: <GrLocation />,
  },
];
