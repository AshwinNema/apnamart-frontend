import { useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import {
  createUpdateProductConfig,
  setCreateUpdateProductConfig,
} from "./create-update-product-config";
import { Dispatch, SetStateAction } from "react";

export interface specificationKeyVal {
  key: string;
  val: string;
  id: string;
}

export type specificationDetailsWithHeader = {
  header?: string;
  keyVals: specificationKeyVal[];
  id: string;
};

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
    label: "Pointers",
  },
];

export interface createUpdateSpecificationProps {
  mainConfig: createUpdateProductConfig;
  setMainConfig: setCreateUpdateProductConfig;
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: UseDisclosureProps["onChange"];
}

export interface createUpdateSpecificationState {
  details: string | specificationDetailsWithHeader;
  enableHeader: boolean;
  addNewKeyVal?: boolean;
  newKey: string;
  newVal: string;
  id: null | number;
  isUpdating: boolean;
}

export const defaultCreateUpdateSpecificationState =
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

export interface specificationKeyValProps {
  keyVal: specificationKeyVal;
  setCreateUpdateSpecificationState: Dispatch<
    SetStateAction<createUpdateSpecificationState>
  >;
}
