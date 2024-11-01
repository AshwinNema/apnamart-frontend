import { columns } from "@/app/_custom-components";
import {
  merchantListOnClickParams,
  merchantListState,
} from "./interfaces & enums & constants";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import { Merchantdetails } from "@/lib/main/slices/user/user.slice";
export * from "./interfaces & enums & constants";

export const merchantListColumns = () => {
  const columns: columns[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "registrationStatus",
      label: "Registration Status",
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
    },
  ];

  return columns;
};

export const merchantListActionHandler = (
  data: merchantListOnClickParams[0],
  type: merchantListOnClickParams[1],
  merchantHandler: (details: {
    type: "block" | "unblock";
    merchantRegistrationId: number;
  }) => void,
  setConfig: Dispatch<SetStateAction<merchantListState>>,
) => {
  switch (type) {
    case "block merchant":
      merchantHandler({
        type: "block",
        merchantRegistrationId: data?.merchantDetails?.id as number,
      });
      break;
    case "unblock merchant":
      merchantHandler({
        type: "unblock",
        merchantRegistrationId: data?.merchantDetails?.id as number,
      });
      break;
    case "view registration details":
      setConfig(
        produce((draft) => {
          draft.selectedRegistrationDetails = {
            ...(data.merchantDetails as Merchantdetails),
            id: data?.merchantDetails?.id as number,
            user: {
              id: data.id as number,
              name: data.name,
              email: data.email,
            },
          };
        }),
      );
      break;
    default:
      break;
  }
};
