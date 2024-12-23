import {
  defaultUploadedImgsConfig,
  setUploadedImgsConfig,
  uploadedImgsConfig,
  uploadImgActions,
  ProductImgsModalContextType,
} from "@/app/merchant/products/helpers";
import { useCallback, useEffect, useState } from "react";
import { produce } from "immer";

const useConfigManager = (
  modalContext: ProductImgsModalContextType,
): [
  uploadedImgsConfig,
  setUploadedImgsConfig,
  (details: uploadImgActions, index: number) => void,
] => {
  const [config, setConfig] = useState<uploadedImgsConfig>(
    defaultUploadedImgsConfig(),
  );

  const width = config.itemLeft[1] - config.itemLeft[0];
  useEffect(() => {
    if (config.hasScrolled || !modalContext) return;

    setConfig(
      produce((draft) => {
        if (draft.hasScrolled) return;
        const { lastVisibleIndex } = draft;
        draft.scrollWidth =
          draft.itemLeft[lastVisibleIndex + 1] - draft.itemLeft[0];
        draft.totalVisibleElements = lastVisibleIndex + 1;
      }),
    );
    modalContext.setConfig(
      produce((draft) => {
        draft.lastVisibleUploadIndex = config.lastVisibleIndex;
      }),
    );
  }, [
    config.hasScrolled,
    config.itemLeft[0],
    config.lastVisibleIndex,
    modalContext,
  ]);

  const uploadImgAction = useCallback(
    (details: uploadImgActions, index: number) => {
      switch (details.type) {
        case "img intersection":
          {
            const { isIntersecting, bounds } = details.details;
            const lastIndex =
              (modalContext?.config?.uploadedImgs?.length || 0) - 1;
            setConfig(
              produce((draft) => {
                draft.itemLeft[index] = bounds.left;
                if (!draft.hasScrolled && isIntersecting) {
                  draft.lastVisibleIndex = Math.max(
                    draft.lastVisibleIndex,
                    index,
                  );
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
          }
          break;

        default:
          break;
      }
    },
    [modalContext, width],
  );

  return [config, setConfig, uploadImgAction];
};

export default useConfigManager;
