import { useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import { createUpdateProductConfig } from "./create-update-product-config";
import { Dispatch, SetStateAction } from "react";

export interface descriptionKeyVal {
  key: string;
  val: string;
  id: string;
}

export interface seriesDescription {
  photo?: File;
  id: string;
  header?: string;
  details: string | descriptionKeyVal[];
}

export const descriptionOptions: {
  key: createUpdateProductConfig["descriptionType"];
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
  {
    key: "series with images",
    label: "Pointers with alternate images",
  },
];

export interface createUpdateDescriptionProps {
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: UseDisclosureProps["onChange"];
}

export interface createUpdateDescriptionState {
  details: string | seriesDescription;
  enableHeader: boolean;
  enablePhoto: boolean;
  addNewKeyVal?: boolean;
  newKey: string;
  newVal: string;
  id: null | number;
  isUpdating: boolean;
  seriesDescriptionType: "text" | "pointers";
}

export const seriesDescriptionTypeOptions: {
  key: createUpdateDescriptionState["seriesDescriptionType"];
  value: string;
}[] = [
  {
    key: "pointers",
    value: "Pointers",
  },
  {
    key: "text",
    value: "Text",
  },
];

export const defaultCreateUpdateDescriptionState =
  (): createUpdateDescriptionState => ({
    details: "",
    enableHeader: false,
    enablePhoto: false,
    addNewKeyVal: false,
    newKey: "",
    newVal: "",
    id: null,
    isUpdating: false,
    seriesDescriptionType: "pointers",
  });

type useDisclosureType = ReturnType<typeof useDisclosure>;

export interface currentDescriptionModalProps {
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: useDisclosureType["onOpenChange"];
  openCreateUpdateModal: () => void;
}

export interface descriptionKeyValState {
  isReadOnly: boolean;
  key: string;
  val: string;
  id: string;
}

export interface descriptionKeyValProps {
  keyVal: descriptionKeyVal;
  setCreateUpdateDescriptionState: Dispatch<
    SetStateAction<createUpdateDescriptionState>
  >;
}
