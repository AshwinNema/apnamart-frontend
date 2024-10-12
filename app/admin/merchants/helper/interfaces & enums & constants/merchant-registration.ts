import { Merchantdetails } from "@/lib/main/slices/user/user.slice";

export interface newRegistrationDetails extends Merchantdetails {
  id: number;
  user: {
    id: number;
    name: string;
  };
}

export interface newRegistrationState {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: newRegistrationDetails[];
  selectedRegistrationDetails: null | newRegistrationDetails;
}

export type subDetails = "address details" | "business location";

export interface viewRegistrationdDetailsState {
  subDetailsType: subDetails | null;
}

export interface subDetailsViewerProps {
  details: newRegistrationDetails;
  subDetailsType: viewRegistrationdDetailsState["subDetailsType"];
  clearSubDetailsType: () => void;
}
