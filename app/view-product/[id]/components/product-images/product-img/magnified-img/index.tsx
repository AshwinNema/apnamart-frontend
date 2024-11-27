import { useContext, useEffect } from "react";
import { MainContext } from "../../../../helpers";
import useConfigManager from "./useConfigManager";
import internalStyles from "../../../../styles.module.css";
import { produce } from "immer";
export const MagnifiedImg = () => {
  const context = useContext(MainContext);
  const [containerRef, config, setConfig] = useConfigManager();

  useEffect(() => {
    const { current } = containerRef;
    const { lensOffsetHeight, lensOffsetWidth, imgHeight, imgWidth } = config;
    if (
      !current ||
      !lensOffsetHeight ||
      !lensOffsetWidth ||
      !imgHeight ||
      !imgWidth
    )
      return;
    const { offsetWidth, offsetHeight } = current;
    const containerLensXRatio = offsetWidth / lensOffsetWidth;
    const containerLensYRatio = offsetHeight / lensOffsetHeight;
    setConfig(
      produce((draft) => {
        draft.containerStyles.backgroundSize = `${imgWidth * containerLensXRatio}px ${imgHeight * containerLensYRatio}px`;
        draft.containerLensXRatio = containerLensXRatio;
        draft.containerLensYRatio = containerLensYRatio;
      }),
    );
  }, [
    config.lensOffsetHeight,
    config.lensOffsetHeight,
    config.imgHeight,
    config.imgWidth,
  ]);

  if (!context) return null;

  return (
    <>
      <div
        ref={containerRef}
        style={config.containerStyles}
        className={`absolute w-[70%] h-[70svh] bg-no-repeat pointer-events-none ${config.hovered ? "opacity-100" : "opacity-0"} ${internalStyles["opacityTransition"]} m-auto align-top top-0  overflow-hidden`}
      ></div>
    </>
  );
};
