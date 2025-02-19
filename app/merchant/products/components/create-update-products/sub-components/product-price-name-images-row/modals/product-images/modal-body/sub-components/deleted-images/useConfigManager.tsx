import {
  defaultUploadedImgsConfig,
  ProductImgsModalContext,
  uploadedImgsConfig,
  deleteImgsHook,
} from "@/app/merchant/products/helpers";
import { useCallback, useContext, useState } from "react";
import { produce } from "immer";

const useConfigManager = (): deleteImgsHook => {
  const modalContext = useContext(ProductImgsModalContext);
  const [config, setConfig] = useState<uploadedImgsConfig>(
    defaultUploadedImgsConfig(),
  );

  const handleImageIntersection = useCallback(
    (isIntersecting: boolean, bounds: DOMRect, index: number) => {
      const lastIndex = (modalContext?.config?.deletedImgs?.length || 0) - 1;
      const isLastOnScreen =
        bounds.right <= window.innerWidth &&
        bounds.right + bounds.width > window.innerWidth;
      setConfig(
        produce((draft) => {
          if (index === lastIndex) {
            draft.showNextArrow = !isIntersecting;
          }
          if (index !== lastIndex && isLastOnScreen) {
            draft.showNextArrow = true;
          }
          if (draft.hasInteracted) return;

          if (index == 0) {
            draft.itemLeft[0] = bounds.left;
          }
          if (index == 1) {
            draft.itemLeft[1] = bounds.left;
          }
        }),
      );
    },
    [modalContext],
  );

  const goForward = useCallback(() => {
    if (!modalContext) return;
    setConfig(
      produce((draft) => {
        draft.hasInteracted = true;
      }),
    );
    const width = config.itemLeft[1] - config.itemLeft[0];
    const totalVisibleElements = Math.floor(
      (window.innerWidth - config.itemLeft[0]) / width,
    );
    modalContext.setConfig(
      produce((draft) => {
        const lastIndex = draft.deletedImgs.length - 1;
        let elementsToSkip = totalVisibleElements;
        if (draft.firstVisibleDeletedIndex + totalVisibleElements > lastIndex)
          return;
        let firstVisibleIndex = draft.firstVisibleDeletedIndex;
        firstVisibleIndex += elementsToSkip;
        if (firstVisibleIndex > lastIndex) {
          const extraElements = firstVisibleIndex - lastIndex;
          elementsToSkip -= extraElements;
          firstVisibleIndex -= extraElements;
        }
        if (elementsToSkip === 0) return;
        draft.firstVisibleDeletedIndex = firstVisibleIndex;
        draft.translateDeletedImgsX = draft.firstVisibleDeletedIndex * width;
      }),
    );
  }, [modalContext, config.itemLeft[0], config.itemLeft[1]]);
  return [config, setConfig, handleImageIntersection, goForward];
};

export default useConfigManager;
