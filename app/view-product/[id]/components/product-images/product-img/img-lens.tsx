import { MutableRefObject, useContext, useEffect, useState } from "react";
import styles from "../../../styles.module.css";
import {
  MainContext,
  notifierTypes,
  productImgConfig,
  ProductImgContext,
} from "../../../helpers";
import { produce } from "immer";
import { getLensCoordinates } from "../../../helpers/img-lens";

export const ImgLens = ({
  config: imgContainerConfig,
  containerRef,
}: {
  config: productImgConfig;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const [config, setConfig] = useState({
    hovered: false,
    top: 0,
    left: 0,
  });
  const context = useContext(MainContext);
  const imgContainerContext = useContext(ProductImgContext);
  useEffect(() => {
    if (!context || !containerRef.current) return;
    const { height, width } = containerRef.current.getBoundingClientRect();
    const subscription = context.notifier.subscribe((event) => {
      switch (event.type) {
        case notifierTypes.hoverIn:
          {
            const { top, left } = getLensCoordinates(
              event,
              imgContainerConfig,
              height,
              width,
              imgContainerContext,
            );

            context.notifier.next({
              type: notifierTypes.imgTranslatePercentage,
              data: {
                x: left - imgContainerConfig.imgLeftOffSet,
                y: top - imgContainerConfig.imgTopOffSet,
              },
            });
    
            setConfig(
              produce((draft) => {
                draft.hovered = true;
                draft.top = top;
                draft.left = left;
              }),
            );
          }
          break;

        case notifierTypes.hoverOut:
          setConfig(
            produce((draft) => {
              draft.hovered = false;
            }),
          );
          break;

        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [
    context?.notifier,
    imgContainerContext?.config?.imgContainerLeft,
    context?.config?.innerWidth,
  ]);
  return (
    <div
      ref={containerRef}
      style={{
        top: `${config.top}px`,
        left: `${config.left}px`,
      }}
      className={`absolute z-[3] pointer-events-none ${config.hovered ? "opacity-100" : "opacity-0"} h-[120px] w-[120px] ${styles["opacityTransition"]} ${styles["lens-container"]}`}
    ></div>
  );
};
