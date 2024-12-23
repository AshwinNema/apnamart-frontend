import {
  defaultUploadedImgsConfig,
  ProductImgsModalContext,
  uploadedImgsConfig,
} from "@/app/merchant/products/helpers";
import { useCallback, useContext, useEffect, useState } from "react";
import { produce } from "immer";

const useConfigManager = (): [
  uploadedImgsConfig,
  (isIntersecting: boolean, bounds: DOMRect, index: number) => void,
  () => void,
] => {
  const modalContext = useContext(ProductImgsModalContext);
  const [config, setConfig] = useState<uploadedImgsConfig>(
    defaultUploadedImgsConfig(),
  );
  const width = config.itemLeft[1] - config.itemLeft[0];
  useEffect(() => {
    if (config.hasScrolled || !modalContext) return;
    const { lastVisibleIndex } = config;
    setConfig(
      produce((draft) => {
        if (draft.hasScrolled) return;
        draft.scrollWidth =
          draft.itemLeft[lastVisibleIndex + 1] - draft.itemLeft[0];
        draft.totalVisibleElements = lastVisibleIndex + 1;
      }),
    );
    modalContext.setConfig(
      produce((draft) => {
        draft.lastVisibleDeletedIndex = lastVisibleIndex;
      }),
    );
  }, [
    config.hasScrolled,
    config.itemLeft[0],
    modalContext,
    config.lastVisibleIndex,
  ]);

  const handleImageIntersection = useCallback(
    (isIntersecting: boolean, bounds: DOMRect, index: number) => {
      const lastIndex = (modalContext?.config?.deletedImgs?.length || 0) - 1;
      setConfig(
        produce((draft) => {
          draft.itemLeft[index] = bounds.left;
          if (!draft.hasScrolled && isIntersecting) {
            draft.lastVisibleIndex = Math.max(draft.lastVisibleIndex, index);
          }
        }),
      );

      index === 0 &&
        setConfig(
          produce((draft) => {
            draft.showBackArrow = !isIntersecting;
          }),
        );

      index === lastIndex &&
        setConfig(
          produce((draft) => {
            draft.showNextArrow = !isIntersecting;
          }),
        );
    },
    [modalContext, width],
  );

  const goForward = useCallback(() => {
    if (!modalContext) return;
    setConfig(
      produce((draft) => {
        draft.hasScrolled = true;
      }),
    );
    modalContext.setConfig(
      produce((draft) => {
        const lastIndex = draft.deletedImgs.length - 1;
        if (draft.lastVisibleDeletedIndex === lastIndex) return;
        let scrollWidth = config.scrollWidth;
        const nextLast =
          draft.lastVisibleDeletedIndex + config.totalVisibleElements;
        let lastVisibleDeletedIndex = 0;
        if (nextLast > lastIndex) {
          scrollWidth = (lastIndex - draft.lastVisibleDeletedIndex) * width;
          lastVisibleDeletedIndex = lastIndex;
        } else {
          lastVisibleDeletedIndex = nextLast;
        }

        draft.translateDeletedImgsX += scrollWidth;
        draft.lastVisibleDeletedIndex = lastVisibleDeletedIndex;
      }),
    );
  }, [modalContext, width]);
  return [config, handleImageIntersection, goForward];
};

export default useConfigManager;
