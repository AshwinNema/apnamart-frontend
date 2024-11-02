import { createContext, MutableRefObject, useContext } from "react";
import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
  descriptionStateEvents,
  mainConfig,
  productImgsModalState,
  setCreateUpdateDescriptionState,
  setCreateUpdateProductConfig,
  setMainConfig,
  setProductImgsModalState,
} from "./interfaces & enums & constants";
import { produce } from "immer";
import { Subject } from "rxjs";
import { FileUploadWithPreview } from "file-upload-with-preview";

export * from "./apis";
export * from "./interfaces & enums & constants";
export * from "./validations";
export * from "./specifications";
export * from "./descriptions";
export * from "./update-product-data-setter";

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

export const ProductImgsModalContext = createContext<null | {
  config: productImgsModalState;
  setConfig: setProductImgsModalState;
  uploadRef: MutableRefObject<FileUploadWithPreview | null>;
  isOpen: boolean;
}>(null);

export const setInitialProductImgModalState = (
  setConfig: setProductImgsModalState,
  mainConfig?: createUpdateProductConfig,
) => {
  if (!mainConfig) return;
  setConfig(
    produce((draft) => {
      draft.view = mainConfig.id ? "view images" : "upload images";
      draft.deletedImgs = produce(mainConfig.deletedImgs, () => {});
      draft.uploadedImgs = produce(mainConfig.uploadedImgs, () => {});
      draft.productImages = produce(mainConfig.productImages, () => {});
    }),
  );
};