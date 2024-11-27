import { uploadedImgDetails } from "@/app/merchant/products/helpers";
import styles from "../../../styles.module.css";
import { MutableRefObject, useContext, useEffect } from "react";
import { MainContext, ProductImgContext } from "../../../helpers";
import { useHover } from "react-aria";
import { produce } from "immer";

export const ProductPhoto = ({
  details,
  lastSlideImgRef,
  index,
}: {
  details: uploadedImgDetails;
  lastSlideImgRef: MutableRefObject<HTMLDivElement | null>;
  index: number;
}) => {
  const mainContext = useContext(MainContext);
  const imgCompContext = useContext(ProductImgContext);
  let { hoverProps } = useHover({
    onHoverStart: () => {
      if (!imgCompContext) return;
      imgCompContext.setConfig(
        produce((draft) => {
          draft.curImgIndex = index;
        }),
      );
    },
  });
  if (!imgCompContext || !mainContext) return null;
  const photos = mainContext.config.details?.photos || [];
  return (
    <div
      {...hoverProps}
      ref={photos.length - 1 === index ? lastSlideImgRef : null}
      className={`${styles["product-thumb"]} p-1 pr-5 cursor-pointer border-solid ${index === imgCompContext.config.curImgIndex ? "border-mainTheme border-2" : "border-[#e0e0e0] border-[1px]"}`}
    >
      <div className={`w-[64px] h-[64px] flex items-center`}>
        <img className="w-[60px] h-[60px] m-auto" src={details.url} />
      </div>
    </div>
  );
};
