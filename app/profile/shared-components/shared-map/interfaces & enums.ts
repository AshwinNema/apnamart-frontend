import { multiplePathSetter } from "@/app/_utils";

export interface AddressDisplayState {
  flyToLocation: [number, number] | null;
  fly: boolean;
  isAddLoaded: boolean;
  address: string;
}

export enum componentTypes {
  merchantRegistration = "Merchant Registration",
  profileAddress = "Profile Address",
}

export interface EventHandlerAndMarkerProps {
  getLocationAddress: (lat: number, lng: number) => void;
  flyToLocation: AddressDisplayState["flyToLocation"];
  fly: AddressDisplayState["fly"];
  setMultipleData: multiplePathSetter;
  componentType: componentTypes;
  disallowMarkerDrag?: boolean;
}

export interface MainCardProps {
  setMultipleData: multiplePathSetter;
  config: AddressDisplayState;
  componentType: componentTypes;
}

export interface MainCardContextState {
  setMultipleData: MainCardProps["setMultipleData"];
  componentType: MainCardProps["componentType"];
}
