import { useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import {
  createUpdateProductConfig,
  specificationDetailsWithHeader,
} from "./create-update-product-config";
import { Dispatch, SetStateAction } from "react";
export * from "./create-update-product-config";

export interface mainConfig {
  currentState: "create" | "update" | "main screen";
}

export const specificationOptions: {
  key: createUpdateProductConfig["specificationType"];
  label: string;
}[] = [
  {
    key: "string",
    label: "Text",
  },
  {
    key: "series",
    label: "Points",
  },
];

export interface newSpecificationProps {
  mainConfig: createUpdateProductConfig;
  setMainConfig: Dispatch<SetStateAction<createUpdateProductConfig>>;
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: UseDisclosureProps["onChange"];
}

export interface createUpdateSpecificationState {
  details: string | specificationDetailsWithHeader;
  enableHeader: boolean;
  addNewKeyVal?: boolean;
  newKey: string;
  newVal: string;
  id: null;
  isUpdating: boolean;
}

export const defaultNewSpecificationConfig =
  (): createUpdateSpecificationState => ({
    details: "",
    enableHeader: false,
    newKey: "",
    newVal: "",
    id: null,
    isUpdating: false,
  });

type useDisclosureType = ReturnType<typeof useDisclosure>;
export interface currentSpecificationModalProps {
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: useDisclosureType["onOpenChange"];
  openCreateUpdateModal: () => void;
}

export interface specificationKeyValState {
  isReadOnly: boolean;
  key: string;
  val: string;
  id: string;
}
