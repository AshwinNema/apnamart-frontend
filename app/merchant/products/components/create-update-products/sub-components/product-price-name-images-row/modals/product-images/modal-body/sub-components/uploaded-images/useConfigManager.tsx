import {
  defaultUploadedImgsConfig,
  setUploadedImgsConfig,
  uploadedImgsConfig,
  uploadImgActions,
  ProductImgsModalContextType,
} from "@/app/merchant/products/helpers";
import { useCallback, useState } from "react";
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

  const uploadImgAction = useCallback(
    (details: uploadImgActions, index: number) => {
      switch (details.type) {
        case "img intersection":
          {
            const { isIntersecting, bounds } = details.details;
            const lastIndex =
              (modalContext?.config?.uploadedImgs?.length || 0) - 1;
            const isLastOnScreen =
              bounds.right <= window.innerWidth &&
              bounds.right + bounds.width > window.innerWidth;
            setConfig(
              produce((draft) => {
                setConfig(
                  produce((draft) => {
                    if (index === lastIndex) {
                      draft.showNextArrow = !isIntersecting;
                    }
                    if (index !== lastIndex && isLastOnScreen) {
                      draft.showNextArrow = true;
                    }
                  }),
                );
                if (draft.hasInteracted) return;
                if (index === 0) {
                  draft.itemLeft[0] = bounds.left;
                }
                if (index === 1) {
                  draft.itemLeft[1] = bounds.left;
                }
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
