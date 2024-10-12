import { ReactNode } from "react";
import { newRegistrationDetails, subDetails } from "../../../helper";
import { GrLocation } from "react-icons/gr";
import { ToolTipBtn } from "@/app/_custom-components";
import { GrView } from "react-icons/gr";

export const getTableRows = (
  details: newRegistrationDetails,
  onViewSubDetails: (subDetailsType: subDetails) => void,
): [string, ReactNode][] => {
  return [
    ["Owner Name", details.user.name],
    ["Business Name", details.name],
    ["Business Description", details.description],
    ["Bank A/C No.", details.bankAcNo],
    ["GSTIN", details.gstIn],
    ["PAN Card", details.panCard],
    [
      "Address Details",
      <>
        <ToolTipBtn
          toolTipProps={{
            color: "secondary",
            content: <p className="text-white">View address details</p>,
            showArrow: true,
          }}
          buttonProps={{
            isIconOnly: true,
            className: "bg-transparent -ml-4",
          }}
        >
          <GrView
            onClick={() => onViewSubDetails("address details")}
            className="scale-[1.3] cursor-pointer"
          />
        </ToolTipBtn>
      </>,
    ],
    [
      "View Business Location",
      <ToolTipBtn
        buttonProps={{
          className: "bg-transparent -ml-4",
          isIconOnly: true,
        }}
        toolTipProps={{
          color: "secondary",
          content: <p className="text-white">View business location</p>,
          showArrow: true,
        }}
      >
        <GrLocation
          onClick={() => onViewSubDetails("business location")}
          className="scale-[1.3]"
        />
      </ToolTipBtn>,
    ],
  ];
};
