import {
  useRef,
  useContext,
  useEffect,
  useState,
  MutableRefObject,
} from "react";
import {
  imgHover,
  MainContext,
  notifierTypes,
  productImgConfig,
} from "../../../helpers";
import { produce } from "immer";

const useEventsManager = (details: {
  cloudinary_public_id: string;
  url: string;
}): [
  MutableRefObject<HTMLLIElement | null>,
  MutableRefObject<HTMLImageElement | null>,
  productImgConfig,
  MutableRefObject<HTMLDivElement | null>,
] => {
  const mainContainerRef = useRef<HTMLLIElement | null>(null);
  const [config, setConfig] = useState<productImgConfig>({
    imgLeftOffSet: 0,
    imgTopOffSet: 0,
    isClicked: false,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const lensContainerRef = useRef<HTMLDivElement | null>(null);
  const mainContext = useContext(MainContext);

  const isLoaded = !!imgRef.current && !!mainContainerRef.current;
  useEffect(() => {
    const setImgOffsets = () => {
      if (!imgRef.current || !mainContainerRef.current) return;
      const { left: imgLeft, top: imgTop } =
        imgRef.current.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        mainContainerRef.current.getBoundingClientRect();
      setConfig(
        produce((draft) => {
          draft.imgLeftOffSet = imgLeft - containerLeft;
          draft.imgTopOffSet = imgTop - containerTop;
        }),
      );
    };
    setImgOffsets();
    window.addEventListener("resize", setImgOffsets);
    return () => {
      window.removeEventListener("resize", setImgOffsets);
    };
  }, [isLoaded, mainContext?.config?.innerWidth]);

  useEffect(() => {
    if (!mainContext || !imgRef.current) return;
    const { width, height } = imgRef.current.getBoundingClientRect();
    mainContext.setConfig(
      produce((draft) => {
        draft.smallerImgHeight = height;
        draft.smallerImgWidth = width;
      }),
    );
    const { removeEventListeners } = imgHover(
      mainContext.notifier,
      details.url,
      imgRef.current,
    );
    return () => {
      removeEventListeners(imgRef.current);
    };
  }, [mainContext, details.url, mainContext?.config?.innerWidth]);
  const leansAndImgLoaded = !!lensContainerRef.current && !!imgRef.current;

  useEffect(() => {
    if (!lensContainerRef.current || !imgRef.current || !mainContext?.notifier)
      return;
    const lensOffsetWidth = lensContainerRef.current.offsetWidth;
    const lensOffsetHeight = lensContainerRef.current.offsetHeight;
    mainContext?.notifier.next({
      type: notifierTypes.imgDimensions,
      data: {
        imgDimensions: imgRef.current.getBoundingClientRect(),
        lensDimensions: lensContainerRef.current.getBoundingClientRect(),
        lensOffsetWidth,
        lensOffsetHeight,
      },
    });
  }, [
    leansAndImgLoaded,
    mainContext?.notifier,
    mainContext?.config?.innerWidth,
  ]);
  return [mainContainerRef, imgRef, config, lensContainerRef];
};

export default useEventsManager;
