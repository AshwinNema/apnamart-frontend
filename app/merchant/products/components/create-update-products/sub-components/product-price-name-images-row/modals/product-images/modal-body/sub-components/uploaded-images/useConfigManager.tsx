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

  useEffect(() => {
    if (config.hasInteracted || !modalContext) return;

    setConfig(
      produce((draft) => {
        if (draft.hasInteracted) return;
        const { lastVisibleIndex } = draft;
        draft.itemWidth = draft.itemLeft[1] - draft.itemLeft[0];
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
    config.hasInteracted,
    config.itemLeft[0],
    config.itemLeft[1],
    config.lastVisibleIndex,
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
                if (!draft.hasInteracted && isIntersecting) {
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
    [modalContext],
  );

  return [config, setConfig, uploadImgAction];
};

export default useConfigManager;
