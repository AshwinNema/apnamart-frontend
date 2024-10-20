import { Dispatch, SetStateAction } from "react";
import {
  createUpdateProductConfig,
  newSpecificationProps,
  specificationDetailsWithHeader,
} from "../interfaces & enums & constants";
import { produce } from "immer";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
export * from "./state-setter";
export * from "./update-delete-series-specifications";

export const getCurState = (
  mainConfig: newSpecificationProps["mainConfig"],
): "create" | "update" => {
  return typeof mainConfig.specifications === "string"
    ? !mainConfig.specifications
      ? "create"
      : "update"
    : !mainConfig.specifications?.length
      ? "create"
      : "update";
};

export const getSpecificationModalHeader = (
  mainConfig: newSpecificationProps["mainConfig"],
) => {
  return getCurState(mainConfig) === "create"
    ? "Create Specification"
    : "Update Specification";
};

export const openUpdateSpecificationModalWithDetails = (
  details: string | specificationDetailsWithHeader,
  setConfig: Dispatch<SetStateAction<createUpdateProductConfig>>,
  openCreateUpdateModal: () => void,
) => {
  setConfig(
    produce((draft) => {
      draft.updateDetails = details;
    }),
  );
  openCreateUpdateModal();
};

export const getSpecificationEditIcon = (
  details: string | specificationDetailsWithHeader,
  setConfig: Dispatch<SetStateAction<createUpdateProductConfig>>,
  openCreateUpdateModal: () => void,
) => {
  return (
    <Tooltip
      color="warning"
      content={<p className="text-white">Update details</p>}
    >
      <span>
        <FaEdit
          className="cursor-pointer scale-150"
          onClick={() => {
            openUpdateSpecificationModalWithDetails(
              details,
              setConfig,
              openCreateUpdateModal,
            );
          }}
        />
      </span>
    </Tooltip>
  );
};
