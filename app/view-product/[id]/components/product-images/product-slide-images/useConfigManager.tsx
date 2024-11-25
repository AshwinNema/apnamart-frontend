import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  cssTranslate,
  setProductThumbConfig,
  productThumbConfig,
} from "../../../helpers";
import { produce } from "immer";

const useConfigManager = (): [
  productThumbConfig,
  setProductThumbConfig,
  MutableRefObject<HTMLDivElement | null>,
  MutableRefObject<HTMLDivElement | null>,
  (scrollNumber: number) => React.CSSProperties,
  () => boolean,
] => {
  const [config, setConfig] = useState<productThumbConfig>({
    hasMore: false,
    downScrolls: 0,
    styles: {},
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSlideImgRef = useRef<HTMLDivElement | null>(null);
  const checkHasMore = (): boolean => {
    if (!containerRef.current || !lastSlideImgRef.current) return false;
    const lastElementTop = lastSlideImgRef.current.getBoundingClientRect().top;
    const containerBottom = containerRef.current.getBoundingClientRect().bottom;
    return lastElementTop > containerBottom;
  };

  useEffect(() => {
    setTimeout(() => {
      const hasMore = checkHasMore();
      setConfig(
        produce((draft) => {
          draft.hasMore = hasMore;
        }),
      );
    }, 200);
  }, [config.downScrolls, config.styles.transform]);

  const getContainerCss = (scrollNumber: number): React.CSSProperties => {
    if (!containerRef.current) return {};
    const transformProp = cssTranslate(-scrollNumber * 100, "%", "y-axis");
    const transitionTime = "350ms";
    return {
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
  };

  return [
    config,
    setConfig,
    containerRef,
    lastSlideImgRef,
    getContainerCss,
    checkHasMore,
  ];
};

export default useConfigManager;
