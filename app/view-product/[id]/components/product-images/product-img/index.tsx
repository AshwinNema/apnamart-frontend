import { useContext } from "react";
import Draggable from "react-draggable";
import styles from "../../../styles.module.css";
import { MainContext, onDragStop, ProductImgContext } from "../../../helpers";
import { ImgLens } from "./img-lens";
import useEventsManager from "./useEventsManager";

export const ProductImg = ({
  index,
  details,
}: {
  index: number;
  details: {
    cloudinary_public_id: string;
    url: string;
  };
}) => {
  const context = useContext(ProductImgContext);

  const mainContext = useContext(MainContext);
  const [mainContainerRef, imgRef, config, lensContainerRef] =
    useEventsManager(details);
  if (!context || !mainContext) return null;
  return (
    <Draggable
      position={{ x: 0, y: 0 }}
      bounds={{
        left:
          index === (mainContext.config.details?.photos.length || 0) - 1
            ? 0
            : undefined,
        right: index !== 0 ? undefined : 0,
      }}
      onStop={(_, data) => {
        onDragStop(mainContainerRef, context, data, mainContext);
      }}
      axis="x"
    >
      <li
        ref={mainContainerRef}
        key={details.cloudinary_public_id}
        className={`flex h-[50svh] items-center relative m-0 p-0 ${styles["slide"]} text-center min-w-full m-0 box-border ${context.config.curImgIndex === index}`}
      >
        {" "}
        <img
          ref={imgRef}
          className="w-[48svh] h-[48svh] m-auto align-top cursor-crosshair"
          src={details.url}
        />
        <ImgLens config={config} containerRef={lensContainerRef} />
      </li>
    </Draggable>
  );
};
