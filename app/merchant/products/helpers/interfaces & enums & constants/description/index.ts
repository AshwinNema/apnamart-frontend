import { useDisclosure, UseDisclosureProps } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { uploadedImgDetails } from "../landing-screen";

export interface descriptionKeyVal {
  key: string;
  val: string;
  id: string;
}

export interface seriesDescription {
  photo?: File;
  uploadedImg?: uploadedImgDetails | null;
  deletedUploadedImg?: uploadedImgDetails | null;
  id: string;
  header?: string;
  details: string | descriptionKeyVal[];
}

export interface seriesDescriptionPayload
  extends Omit<seriesDescription, "photo"> {
  photo?: uploadedImgDetails;
}

export interface createUpdateDescriptionProps {
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: UseDisclosureProps["onChange"];
}

export interface createUpdateDescriptionState {
  details: string | seriesDescription;
  photo?: File;
  enableHeader: boolean;
  enablePhoto: boolean;
  addNewKeyVal?: boolean;
  newKey: string;
  newVal: string;
  id: null | number;
  isUpdating: boolean;
  seriesDescriptionType: "text" | "pointers";
}

export interface seriesConfig extends createUpdateDescriptionState {
  details: seriesDescription;
}

export type setCreateUpdateDescriptionState = Dispatch<
  SetStateAction<createUpdateDescriptionState>
>;

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

export type descriptionStateEvents = {
  type: "add file";
  data: File;
};

export * from "./constants";
