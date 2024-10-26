import { createContext, MutableRefObject } from "react";
import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
  descriptionStateEvents,
  mainConfig,
  setCreateUpdateDescriptionState,
  setCreateUpdateProductConfig,
  setMainConfig,
} from "./interfaces & enums & constants";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { Subject } from "rxjs";
import { Dispatch } from "@reduxjs/toolkit";

export * from "./apis";
export * from "./interfaces & enums & constants";
export * from "./validations";
export * from "./specifications";
export * from "./descriptions";
export * from "./common-components";
export * from "./product-filters";

export const MainContext = createContext<{
  config: mainConfig;
  setConfig: setMainConfig;
} | null>(null);

export const MainCreateUpdateProductContext = createContext<{
  config: createUpdateProductConfig;
  setConfig: setCreateUpdateProductConfig;
} | null>(null);

export const CreateUpdateDescriptionContext = createContext<null | {
  config: createUpdateDescriptionState;
  setConfig: setCreateUpdateDescriptionState;
  descriptionEventsEmitter: Subject<descriptionStateEvents>;
}>(null);
