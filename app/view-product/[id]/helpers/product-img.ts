import { MutableRefObject } from "react";
import { mainContext, notifierTypes, productImgContext } from ".";
import { produce } from "immer";

export const onDragStop = (
  mainContainerRef: MutableRefObject<HTMLLIElement | null>,
  context: productImgContext,
  data: {
    x: number;
  },
  mainContext: mainContext,
) => {
  if (!mainContainerRef?.current) return;
  const width = mainContainerRef?.current.getBoundingClientRect().width;
  const change = (data.x / width) * 100;
  const hasSwiped = change < -25 || change > 25;
  const changeIndex = change < -25 ? 1 : -1;

  if (hasSwiped) {
    context.setConfig(
      produce((draft) => {
        draft.curImgIndex =
          (draft.curImgIndex + changeIndex) %
          (mainContext.config.details?.photos.length || 1);
      }),
    );
  }
};

export const imgHover = (
  notifier: mainContext["notifier"],
  img: string,
  imageElement: HTMLImageElement,
) => {
  const onMouseHover = (e: MouseEvent) => {
    if (!e.target) return;
    const imgDimensions = (
      e.target as HTMLImageElement
    ).getBoundingClientRect();
    notifier.next({
      type: notifierTypes.hoverIn,
      data: {
        src: img,
        xPosition: e.clientX,
        yPosition: e.clientY,
        imgDimensions,
      },
    });
  };

  const onMouseLeave = (e: MouseEvent) => {
    if (!e.target) return;
    notifier.next({
      type: notifierTypes.hoverOut,
    });
  };

  imageElement.addEventListener("mouseenter", onMouseHover);
  imageElement.addEventListener("mousemove", onMouseHover);
  imageElement.addEventListener("mouseleave", onMouseLeave);

  const removeEventListeners = (imageElement?: HTMLImageElement | null) => {
    if (!imageElement) return;
    imageElement.removeEventListener("mouseenter", onMouseHover);
    imageElement.removeEventListener("mousemove", onMouseHover);
    imageElement.removeEventListener("mouseleave", onMouseLeave);
  };

  return {
    onMouseHover,
    onMouseLeave,
    removeEventListeners,
  };
};
