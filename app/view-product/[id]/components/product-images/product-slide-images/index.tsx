import { uploadedImgDetails } from "@/app/merchant/products/helpers";
import React, { Fragment, useContext } from "react";
import { ProductImgContext, ProductThumbContext } from "../../../helpers";
import styles from "../styles.module.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { produce } from "immer";
import useConfigManager from "./useConfigManager";
import { ProductPhoto } from "./subcomponents";

export const ProductSlideImages = ({
  photos,
}: {
  photos: uploadedImgDetails[];
}) => {
  const [
    config,
    setConfig,
    containerRef,
    lastSlideImgRef,
    getContainerCss,
    checkHasMore,
  ] = useConfigManager();
  const context = useContext(ProductImgContext);

  if (!context) return null;
  return (
    <div className="ml-2 h-[50svh] relative overflow-hidden" ref={containerRef}>
      {config.downScrolls > 0 && (
        <div
          onClick={() => {
            setConfig(
              produce((draft) => {
                if (draft.downScrolls > 0) {
                  draft.downScrolls = draft.downScrolls - 1;
                }
                draft.styles = getContainerCss(draft.downScrolls);
              }),
            );
          }}
          className={`absolute w-full z-[2] h-[24px] left-0 top-0 ${styles["product-thumb-arrows"]} text-center cursor-pointer flex justify-center items-center`}
        >
          <FaAngleUp />
        </div>
      )}

      <ProductThumbContext.Provider value={{ config, setConfig }}>
        <div className="relative h-[50svh]" style={config.styles}>
          {photos.map((details, index) => {
            return (
              <Fragment key={details.cloudinary_public_id}>
                <ProductPhoto
                  details={details}
                  index={index}
                  lastSlideImgRef={lastSlideImgRef}
                />
              </Fragment>
            );
          })}
        </div>
      </ProductThumbContext.Provider>

      {config.hasMore && (
        <div
          onClick={() => {
            const hasMore = checkHasMore();

            setConfig(
              produce((draft) => {
                if (hasMore) {
                  draft.downScrolls = draft.downScrolls + 1;
                }
                draft.hasMore = hasMore;
                draft.styles = getContainerCss(draft.downScrolls);
              }),
            );
          }}
          className={`absolute w-full z-[2] h-[24px] left-0 bottom-0 ${styles["product-thumb-arrows"]} text-center cursor-pointer flex justify-center items-center`}
        >
          <FaAngleDown />
        </div>
      )}
    </div>
  );
};
