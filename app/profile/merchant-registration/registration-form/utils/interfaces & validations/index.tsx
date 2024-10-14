import { Merchantdetails } from "@/lib/main/slices/user/user.slice";
import { InputProps, TooltipProps } from "@nextui-org/react";
import { ReactNode } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { FaBusinessTime } from "react-icons/fa6";
export * from "./validations";

export interface commonTextInputProps {
  isRequired: boolean;
  fullWidth: boolean;
  labelPlacement: InputProps["labelPlacement"];
  classNames: InputProps["classNames"];
}

export interface step0Details {
  name: Merchantdetails["name"];
  description: Merchantdetails["description"];
}

export interface step1Details {
  bankAcNo: Merchantdetails["bankAcNo"];
  gstIn: Merchantdetails["gstIn"];
  panCard: Merchantdetails["panCard"];
}

export interface nxtSaveBtnState {
  toolTipMsg: ReactNode;
  toolTipColor: TooltipProps["color"];
}

export const getDefaultStepperNxtBtnState = (): nxtSaveBtnState => {
  return {
    toolTipMsg: "",
    toolTipColor: "primary",
  };
};

export interface step2Details {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
}

export interface nextHandlerDetails
  extends step0Details,
    step1Details,
    step2Details {
  id?: number;
}

export interface createUpdateRegistrationDetails extends nextHandlerDetails {
  latitude: number;
  longtitude: number;
  registrationStatus: Merchantdetails["registrationStatus"];
}

export const addressDrawerDefaultVal = (): step2Details => ({
  addressLine1: "",
  addressLine2: "",
  pinCode: "",
});

export enum stepLabels {
  businessOverview = "Business Overview",
  bankDetails = "Bank & Tax Details",
  pickUpAddress = "Pick Up Address",
}

export const stepList = [
  stepLabels.businessOverview,
  stepLabels.bankDetails,
  stepLabels.pickUpAddress,
];

export const stepIcons = {
  [stepLabels.businessOverview]: <FcBusinessman className="scale-[1.5]" />,
  [stepLabels.bankDetails]: <FaBusinessTime />,
  [stepLabels.pickUpAddress]: <FaTruckMoving />,
};

export interface forwardTooltipProps {
  content: ReactNode;
  color: TooltipProps["color"];
}
