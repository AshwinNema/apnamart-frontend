import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";
import {
  createUpdateProductConfig,
  mainConfig,
  setCreateUpdateProductConfig,
} from "./interfaces & enums & constants";
import { FileUploadWithPreview } from "file-upload-with-preview";

export * from "./apis";
export * from "./interfaces & enums & constants";
export * from "./validations";
export * from "./specifications";
export * from "./descriptions";
export * from "./common-components";
export * from "./product-filters"

export const MainContext = createContext<{
  config: mainConfig;
  setConfig: Dispatch<SetStateAction<mainConfig>>;
} | null>(null);

export const MainCreateUpdateProductContext = createContext<{
  config: createUpdateProductConfig;
  setConfig: setCreateUpdateProductConfig;
  uploadRef: MutableRefObject<FileUploadWithPreview | null>;
} | null>(null);
