import { useEffect, useState } from "react";
import { categoryConfig, defaultCategoryConfig } from "../helpers";
import { produce } from "immer";
import { menuOption } from "@/lib/main/slices/product-menu/product-menu.slice";

const useCategoryConfigManager = (
  details: menuOption,
): [
  categoryConfig,
  (index: number, isIntersecting: boolean, bounds: DOMRect) => void,
  () => void,
  () => void,
] => {
  const [config, setConfig] = useState<categoryConfig>(defaultCategoryConfig());
  useEffect(() => {
    if (config.hasInteracted) return;
    setConfig(
      produce((draft) => {
        if (draft.hasInteracted) return;
        const width = draft.itemsLefts[1] - draft.itemsLefts[0];
        draft.totalVisibleElements = draft.lastVisibleIndex + 1;
        draft.scrollWidth = draft.totalVisibleElements * width;
      }),
    );
  }, [
    config.hasInteracted,
    config.lastVisibleIndex,
    config.itemsLefts[0],
    config.itemsLefts[1],
  ]);

  const handleItemInteraction = (
    index: number,
    isIntersecting: boolean,
    bounds: DOMRect,
  ) => {
    const lastIndex = details.subCategory.length - 1;
    setConfig(
      produce((draft) => {
        if (draft.hasInteracted) return;
        if (index === 0) {
          draft.itemsLefts[0] = bounds.left;
        }
        if (index === 1) {
          draft.itemsLefts[1] = bounds.left;
        }
        if (isIntersecting && index > draft.lastVisibleIndex) {
          draft.lastVisibleIndex = index;
        }
      }),
    );
    index === 0 &&
      setConfig(
        produce((draft) => {
          draft.showBackArrow = !isIntersecting;
        }),
      );

    const isInBounds = bounds.top >= 0 && bounds.bottom <= window.innerHeight;

    isInBounds &&
      index === lastIndex &&
      setConfig(
        produce((draft) => {
          draft.showNextArrow = !isIntersecting;
        }),
      );
  };
  const goForward = () => {
    const lastIndex = details.subCategory.length - 1;
    setConfig(
      produce((draft) => {
        draft.hasInteracted = true;
        if (draft.lastVisibleIndex === lastIndex) return;
        let scrollWidth = draft.scrollWidth;
        let nextLast = draft.lastVisibleIndex + draft.totalVisibleElements;
        if (nextLast > lastIndex) {
          scrollWidth =
            (lastIndex - draft.lastVisibleIndex) *
            (draft.itemsLefts[1] - draft.itemsLefts[0]);
          nextLast = lastIndex;
        }
        draft.translateX += scrollWidth;
        draft.lastVisibleIndex = nextLast;
      }),
    );
  };
  const goBackward = () => {
    setConfig(
      produce((draft) => {
        draft.lastVisibleIndex = Math.max(
          draft.lastVisibleIndex - draft.totalVisibleElements,
          draft.totalVisibleElements - 1,
        );
        draft.translateX = Math.max(0, draft.translateX - draft.scrollWidth);
      }),
    );
  };

  return [config, handleItemInteraction, goForward, goBackward];
};

export default useCategoryConfigManager;
