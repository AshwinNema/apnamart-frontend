import {
  uploadedImgsConfig,
  setUploadedImgsConfig,
  setProductImgsModalState,
  uploadImgProps,
} from "./interfaces & enums & constants";
import { produce } from "immer";

export const getLastIntersectingIndex = (list: boolean[]) => {
  return list.reduce((intersectingIndex, isIntersecting, index) => {
    if (isIntersecting) {
      return index;
    }
    return intersectingIndex;
  }, 0);
};

export const goForward = (
  config: uploadedImgsConfig,
  setModalConfig: setProductImgsModalState,
  setConfig: setUploadedImgsConfig,
) => {
  const width = config.itemWidth;
  setConfig(
    produce((draft) => {
      draft.hasInteracted = true;
    }),
  );
  setModalConfig(
    produce((draft) => {
      const lastIndex = draft.uploadedImgs.length - 1;

      if (draft.lastVisibleUploadIndex === lastIndex) return;
      let scrollWidth = config.scrollWidth;
      let nextLast = draft.lastVisibleUploadIndex + config.totalVisibleElements;

      if (nextLast > lastIndex) {
        scrollWidth = (lastIndex - draft.lastVisibleUploadIndex) * width;
        nextLast = lastIndex;
      }
      draft.translateUploadImgsX += scrollWidth;
      draft.lastVisibleUploadIndex = nextLast;
    }),
  );
};

export const goBackward = (
  config: uploadedImgsConfig,
  setModalConfig: setProductImgsModalState,
) => {
  setModalConfig(
    produce((draft) => {
      draft.lastVisibleUploadIndex = Math.max(
        draft.lastVisibleUploadIndex - config.totalVisibleElements,
        config.totalVisibleElements - 1,
      );
      draft.translateUploadImgsX = Math.max(
        0,
        draft.translateUploadImgsX - config.scrollWidth,
      );
    }),
  );
};

export const deleteUploadedImg = (
  setConfig: setProductImgsModalState,
  imgDetails: uploadImgProps["imgDetails"],
  width: number,
  setUploadConfig: setUploadedImgsConfig,
) => {
  setUploadConfig(
    produce((draft) => {
      draft.hasInteracted = true;
    }),
  );

  setConfig(
    produce((draft) => {
      const lastIndex = draft.uploadedImgs.length - 1;
      draft.deletedImgs.push(imgDetails);
      draft.uploadedImgs = draft.uploadedImgs.filter(
        (newUploadedImgDetails) =>
          imgDetails.cloudinary_public_id !==
          newUploadedImgDetails.cloudinary_public_id,
      );
      draft.lastVisibleUploadIndex = Math.min(
        draft.lastVisibleUploadIndex,
        lastIndex,
      );
      draft.lastVisibleUploadIndex = Math.max(draft.lastVisibleUploadIndex, 0);
      if (lastIndex === draft.lastVisibleUploadIndex) {
        draft.translateUploadImgsX = Math.max(
          draft.translateUploadImgsX - width,
          0,
        );
        draft.lastVisibleUploadIndex -= 1;
      }
    }),
  );
};
