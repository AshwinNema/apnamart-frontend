import {
  uploadedImgsConfig,
  setUploadedImgsConfig,
  setProductImgsModalState,
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
  const width = config.itemLeft[1] - config.itemLeft[0];
  setConfig(
    produce((draft) => {
      draft.hasScrolled = true;
    }),
  );
  setModalConfig(
    produce((draft) => {
      const lastIndex = draft.uploadedImgs.length - 1;
      if (draft.lastVisibleUploadIndex === lastIndex) return
      let scrollWidth = config.scrollWidth;
      let nextLast = draft.lastVisibleUploadIndex + config.totalVisibleElements;
    
      if (nextLast > lastIndex) {
        scrollWidth = (lastIndex - draft.lastVisibleUploadIndex) * width;
        nextLast = lastIndex
      }
      draft.translateUploadImgsX += scrollWidth;
      draft.lastVisibleUploadIndex = nextLast
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
