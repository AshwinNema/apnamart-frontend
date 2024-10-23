import { Merchantdetails } from "@/lib/main/slices/user/user.slice";
import { SetStateAction, Dispatch } from "react";

export interface newRegistrationDetails extends Merchantdetails {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface newRegistrationState<T> {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: T[];
  selectedRegistrationDetails: null | newRegistrationDetails;
}

export enum subDetails {
  addressDetails = "address details",
  businessLocation = "business location",
}

export interface viewRegistrationdDetailsState {
  subDetailsType: subDetails | null;
  address: string;
}

export interface subDetailsViewerProps {
  details: newRegistrationDetails;
  subDetailsType: viewRegistrationdDetailsState["subDetailsType"];
  clearSubDetailsType: () => void;
  address: string;
}

export interface merchantRegistrationSubComponentProps<T> {
  config: newRegistrationState<T>;
  setConfig: Dispatch<SetStateAction<newRegistrationState<T>>>;
  getData: (page: number) => void;
}

export interface selectedRegistrationProps<
  T,
  V extends {
    selectedRegistrationDetails: null | newRegistrationDetails;
    page: number;
  },
> extends Omit<
    Omit<merchantRegistrationSubComponentProps<T>, "config">,
    "setConfig"
  > {
  config: V;
  setConfig: Dispatch<SetStateAction<V>>;
  goBackTooltipText?: string;
  goBackBtnText?: string;
}
