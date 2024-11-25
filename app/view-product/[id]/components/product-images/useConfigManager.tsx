import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  cssTranslate,
  productImagesConfig,
  setProductImagesConfig,
} from "../../helpers";
import { produce } from "immer";

const useConfigManager = (): [
  productImagesConfig,
  setProductImagesConfig,
  MutableRefObject<HTMLUListElement | null>,
] => {
  const [config, setConfig] = useState<productImagesConfig>({
    curImgIndex: 0,
    itemListStyle: {},
    imgContainerLeft: 0,
    imgContainerTop: 0,
  });
  const containerRef = useRef<HTMLUListElement | null>(null);
  const isLoaded = !!containerRef.current;

  useEffect(() => {
    const setLeftOffset = () => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      setConfig(
        produce((draft) => {
          draft.imgContainerLeft = left;
          draft.imgContainerTop = top;
        }),
      );
    };
    setLeftOffset();
    window.addEventListener("resize", setLeftOffset);
    return () => {
      window.removeEventListener("resize", setLeftOffset);
    };
  }, [isLoaded]);

  useEffect(() => {
    const { curImgIndex } = config;
    const transformProp = cssTranslate(-curImgIndex * 100, "%");
    const transitionTime = "350ms";

    const itemListStyle: React.CSSProperties = {
      WebkitTransform: transformProp,
      msTransform: transformProp,
      OTransform: transformProp,
      transform: transformProp,
      WebkitTransitionDuration: transitionTime,
      MozTransitionDuration: transitionTime,
      OTransitionDuration: transitionTime,
      transitionDuration: transitionTime,
      msTransitionDuration: transitionTime,
    };

    setConfig(
      produce((draft) => {
        draft.itemListStyle = itemListStyle;
      }),
    );
  }, [config.curImgIndex]);
  return [config, setConfig, containerRef];
};

export default useConfigManager;
