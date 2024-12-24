import { useEffect, useRef, MutableRefObject } from "react";
import { deletedImgProps } from "@/app/merchant/products/helpers";

const useConfigManager = (
  containerRef: MutableRefObject<null | HTMLDivElement>,
  handleImageIntersection: deletedImgProps["handleImageIntersection"],
  index: deletedImgProps["index"],
) => {
  const hasIntersected = useRef(false);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        hasIntersected.current = isIntersecting;
        setTimeout(() => {
          let bounds: DOMRect | null = null;
          if (containerRef.current) {
            bounds = containerRef.current.getBoundingClientRect();
          }
          bounds &&
            handleImageIntersection(hasIntersected.current, bounds, index);
        }, 400);
      },
      {
        threshold: 1,
      },
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [index]);
};

export default useConfigManager;
