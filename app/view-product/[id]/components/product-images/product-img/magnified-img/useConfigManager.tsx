import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getDefaultMagnifiedImgConfig,
  magnifiedImgConfig,
  MainContext,
  notifierTypes,
  setMagnifiedImgConfig,
} from "../../../../helpers";
import { produce } from "immer";

const useConfigManager = (): [
  MutableRefObject<HTMLDivElement | null>,
  magnifiedImgConfig,
  setMagnifiedImgConfig,
] => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRefLoaded = !!containerRef.current;
  const [config, setConfig] = useState<magnifiedImgConfig>(
    getDefaultMagnifiedImgConfig(),
  );
  const context = useContext(MainContext);
  useEffect(() => {
    if (!context || !containerRef.current) return;
    const subscription = context.notifier.subscribe((event) => {
      switch (event.type) {
        case notifierTypes.hoverIn:
          {
            const { src } = event.data;
            setConfig(
              produce((draft) => {
                draft.hovered = true;
                draft.containerStyles.backgroundImage = `url(${src})`;
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

        case notifierTypes.imgTranslatePercentage:
          {
            const { x, y } = event.data;
            setConfig(
              produce((draft) => {
                draft.containerStyles.backgroundPosition = `-${x * config.containerLensXRatio}px -${y * config.containerLensYRatio}px`;
              }),
            );
          }
          break;
        case notifierTypes.imgDimensions:
          {
            const {
              imgDimensions,
              lensOffsetHeight,
              lensOffsetWidth,
            } = event.data;
            setConfig(
              produce((draft) => {
                draft.imgHeight = imgDimensions.height;
                draft.imgWidth = imgDimensions.width;
                draft.lensOffsetHeight = lensOffsetHeight;
                draft.lensOffsetWidth = lensOffsetWidth;
              }),
            );
          }
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
    isRefLoaded,
    config.containerLensXRatio,
    config.containerLensYRatio,
  ]);

  return [containerRef, config, setConfig];
};

export default useConfigManager;
