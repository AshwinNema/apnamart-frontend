import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  cssTranslate,
  getProductImagesDefaultConfig,
  productImagesConfig,
  setProductImagesConfig,
} from "../../helpers";
import { produce } from "immer";
import { MainContext } from "../../helpers";

const useConfigManager = (): [
  productImagesConfig,
  setProductImagesConfig,
  MutableRefObject<HTMLUListElement | null>,
] => {
  const [config, setConfig] = useState<productImagesConfig>(
    getProductImagesDefaultConfig(),
  );
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
  const mainContext = useContext(MainContext);
  useEffect(() => {
    if (!mainContext) return;
    mainContext.config.details?.wishList?.[0] &&
      setConfig(
        produce((draft) => {
          draft.productIsLiked = true;
        }),
      );
  }, [mainContext?.config.details?.wishList]);

  return [config, setConfig, containerRef];
};

export default useConfigManager;
