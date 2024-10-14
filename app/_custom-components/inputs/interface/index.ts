import { setVal } from "@/app/_utils";
import { InputSlots, SlotsToClasses } from "@nextui-org/react";
import { FileUploadWithPreview, Options } from "file-upload-with-preview";
import { ReactNode } from "react";
import { ZodSchema } from "zod";
export * from "./auto-complete.props";

export interface TextInputProps {
  value: string;
  setData: setVal;
  validationSchema?: ZodSchema;
  Icon?: () => ReactNode;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
  autoFocus?: boolean;
  labelPlacement?: "outside" | "outside-left" | "inside";
  fullWidth?: boolean;
  classNames?: SlotsToClasses<InputSlots>;
  isRequired?: boolean;
  type?: string;
  isReadOnly?: boolean;
}

export interface TextInputState {
  invalid: boolean;
  errorMsg: string;
  label: string;
  placeholder: string;
}

export interface autoCompleteListItem {
  id: string | number;
  label: string;
  photo?: string;
}

export interface AutoCompleteInputSearchProps {
  getListItems: (inputVal: string) => Promise<autoCompleteListItem[]>;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onSelectionChange: (key: string | number) => any;
  onInputClear?: () => void;
}

export interface autoCompleteState {
  itemList: autoCompleteListItem[];
  inputValue: string;
  selectedKey: string | null;
}

// setUpload - For setting the upload outside the component,
// value -  if the uploader is already present, then if any file is setted up there that file is being set to that file (in case of conditional rerendering)
// dataUploadId - dat upload id for the upload

export interface ImgPreviewInputProps {
  setUpload: (upload: FileUploadWithPreview) => void;
  value?: FileUploadWithPreview | null;
  dataUploadId: string;
  options?: Options;
  imgChangeCallback?: () => void;
  clearCallback?: () => void;
}
