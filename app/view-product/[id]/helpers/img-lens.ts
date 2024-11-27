import {
  hoverInEvent,
  productImgConfig,
  productImgContext,
} from "./interfaces & enums& constants";

export const getLensCoordinates = (
  event: hoverInEvent,
  imgContainerConfig: productImgConfig,
  height: number,
  width: number,
  imgContainerContext?: productImgContext | null,
) => {
  const { imgDimensions, xPosition, yPosition } = event.data;
  let top = Math.max(
    yPosition -
      imgDimensions.top +
      imgContainerConfig.imgTopOffSet -
      height / 2,
    imgContainerConfig.imgTopOffSet,
  );

  if (top + height > imgDimensions.height + imgContainerConfig.imgTopOffSet) {
    top = imgDimensions.height + imgContainerConfig.imgTopOffSet - height;
  }

  let left = Math.max(
    xPosition -
      (imgContainerContext?.config?.imgContainerLeft || 0) -
      width / 2,
    imgContainerConfig.imgLeftOffSet,
  );

  if (left + width > imgDimensions.width + imgContainerConfig.imgLeftOffSet) {
    left = imgDimensions.width + imgContainerConfig.imgLeftOffSet - width;
  }

  return {
    top,
    left,
  };
};
