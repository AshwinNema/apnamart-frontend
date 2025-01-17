import { useState } from "react";
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
      }),
    );

    const isInBounds = bounds.top >= 0 && bounds.bottom <= window.innerHeight;
    const isLastOnScreen =
      bounds.right <= window.innerWidth &&
      bounds.right + bounds.width > window.innerWidth;
    setConfig(
      produce((draft) => {
        if (isInBounds && index === lastIndex) {
          draft.showNextArrow = !isIntersecting;
        }
        if (isInBounds && index !== lastIndex && isLastOnScreen) {
          draft.showNextArrow = true;
        }
      }),
    );
  };
  const goForward = () => {
    const lastIndex = details.subCategory.length - 1;
    setConfig(
      produce((draft) => {
        draft.hasInteracted = true;
        const width = draft.itemsLefts[1] - draft.itemsLefts[0];
        const totalVisibleElements = Math.floor(
          (window.innerWidth - draft.itemsLefts[0]) / width,
        );

        let elementsToSkip = totalVisibleElements;
        if (draft.firstVisibleIndex + totalVisibleElements > lastIndex) return;
        let firstVisibleIndex = draft.firstVisibleIndex;

        firstVisibleIndex += elementsToSkip;

        if (firstVisibleIndex > lastIndex) {
          const extraElements = firstVisibleIndex - lastIndex;
          elementsToSkip -= extraElements;
          firstVisibleIndex -= extraElements;
        }

        if (elementsToSkip === 0) return;
        draft.firstVisibleIndex = firstVisibleIndex;
        draft.translateX = draft.firstVisibleIndex * width;
      }),
    );
  };
  const goBackward = () => {
    setConfig(
      produce((draft) => {
        const width = draft.itemsLefts[1] - draft.itemsLefts[0];
        const totalVisibleElements = Math.floor(
          (window.innerWidth - draft.itemsLefts[0]) / width,
        );
        draft.firstVisibleIndex = Math.max(
          draft.firstVisibleIndex - totalVisibleElements,
          0,
        );
        draft.translateX = draft.firstVisibleIndex * width;
      }),
    );
  };

  return [config, handleItemInteraction, goForward, goBackward];
};

export default useCategoryConfigManager;
