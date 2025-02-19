import {
  uploadedImgsConfig,
  setUploadedImgsConfig,
  setProductImgsModalState,
  uploadImgProps,
} from "./interfaces & enums & constants";
import { produce } from "immer";

export const goForward = (
  config: uploadedImgsConfig,
  setModalConfig: setProductImgsModalState,
  setConfig: setUploadedImgsConfig,
) => {
  const width = config.itemLeft[1] - config.itemLeft[0];
  const totalVisibleElements = Math.floor(
    (window.innerWidth - config.itemLeft[0]) / width,
  );
  setConfig(
    produce((draft) => {
      draft.hasInteracted = true;
    }),
  );
  setModalConfig(
    produce((draft) => {
      const lastIndex = draft.uploadedImgs.length - 1;
      let elementsToSkip = totalVisibleElements;
      if (draft.firstVisibleUploadIndex + totalVisibleElements > lastIndex)
        return;
      let firstVisibleIndex = draft.firstVisibleUploadIndex;
      firstVisibleIndex += elementsToSkip;
      if (firstVisibleIndex > lastIndex) {
        const extraElements = firstVisibleIndex - lastIndex;
        elementsToSkip -= extraElements;
        firstVisibleIndex -= extraElements;
      }
      if (elementsToSkip === 0) return;
      draft.firstVisibleUploadIndex = firstVisibleIndex;
      draft.translateUploadImgsX = draft.firstVisibleUploadIndex * width;
    }),
  );
};

export const goBackward = (
  config: uploadedImgsConfig,
  setModalConfig: setProductImgsModalState,
) => {
  const width = config.itemLeft[1] - config.itemLeft[0];
  const totalVisibleElements = Math.floor(
    (window.innerWidth - config.itemLeft[0]) / width,
  );
  setModalConfig(
    produce((draft) => {
      draft.firstVisibleUploadIndex = Math.max(
        draft.firstVisibleUploadIndex - totalVisibleElements,
        0,
      );
      draft.translateUploadImgsX = draft.firstVisibleUploadIndex * width;
    }),
  );
};

export const deleteUploadedImg = (
  setConfig: setProductImgsModalState,
  imgDetails: uploadImgProps["imgDetails"],
  setUploadConfig: setUploadedImgsConfig,
  config: uploadedImgsConfig,
) => {
  setUploadConfig(
    produce((draft) => {
      draft.hasInteracted = true;
    }),
  );
  const width = config.itemLeft[1] - config.itemLeft[0];
  const totalVisibleElements =
    Math.floor((window.innerWidth - config.itemLeft[0]) / width) - 1;

  setConfig(
    produce((draft) => {
      draft.deletedImgs.push(imgDetails);
      draft.uploadedImgs = draft.uploadedImgs.filter(
        (newUploadedImgDetails) =>
          imgDetails.cloudinary_public_id !==
          newUploadedImgDetails.cloudinary_public_id,
      );
      const lastIndex = draft.uploadedImgs.length - 1;
      const curLastVisibleIndex =
        draft.firstVisibleUploadIndex + totalVisibleElements;

      if (curLastVisibleIndex > lastIndex) {
        draft.firstVisibleUploadIndex = Math.max(
          draft.firstVisibleUploadIndex - 1,
          0,
        );
        draft.translateUploadImgsX = draft.firstVisibleUploadIndex * width;
      }
    }),
  );
};
