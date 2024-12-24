import {
  defaultUploadedImgsConfig,
  ProductImgsModalContext,
  uploadedImgsConfig,
  deleteImgsHook,
} from "@/app/merchant/products/helpers";
import { useCallback, useContext, useEffect, useState } from "react";
import { produce } from "immer";

const useConfigManager = (): deleteImgsHook => {
  const modalContext = useContext(ProductImgsModalContext);
  const [config, setConfig] = useState<uploadedImgsConfig>(
    defaultUploadedImgsConfig(),
  );

  useEffect(() => {
    if (config.hasInteracted || !modalContext) return;
    const { lastVisibleIndex } = config;
    setConfig(
      produce((draft) => {
        if (draft.hasInteracted) return;
        draft.itemWidth = config.itemLeft[1] - config.itemLeft[0];
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
    config.hasInteracted,
    config.itemLeft[0],
    config.itemLeft[1],
    modalContext,
    config.lastVisibleIndex,
  ]);

  const handleImageIntersection = useCallback(
    (isIntersecting: boolean, bounds: DOMRect, index: number) => {
      const lastIndex = (modalContext?.config?.deletedImgs?.length || 0) - 1;
      setConfig(
        produce((draft) => {
          draft.itemLeft[index] = bounds.left;
          if (!draft.hasInteracted && isIntersecting) {
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
    [modalContext],
  );

  const goForward = useCallback(() => {
    if (!modalContext) return;
    setConfig(
      produce((draft) => {
        draft.hasInteracted = true;
      }),
    );
    const width = config.itemWidth;
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
  }, [modalContext]);
  return [config, setConfig, handleImageIntersection, goForward];
};

export default useConfigManager;
