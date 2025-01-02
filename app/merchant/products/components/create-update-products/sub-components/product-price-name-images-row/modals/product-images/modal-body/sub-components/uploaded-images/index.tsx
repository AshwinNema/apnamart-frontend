import {
  deleteUploadedImg,
  goBackward,
  goForward,
  ProductImgsModalContextType,
} from "@/app/merchant/products/helpers";
import React, { Fragment } from "react";
import { UploadedImg } from "./uploaded-img";
import useConfigManager from "./useConfigManager";
import styles from "@/app/styles.module.css";
import { BackArrow, NextArrow } from "@/app/_custom-components";

export const UploadedImages = ({
  modalContext,
}: {
  modalContext: ProductImgsModalContextType;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [config, setConfig, uploadImgAction] = useConfigManager(modalContext);

  return (
    <>
      <div className="relative overflow-hidden">
        <BackArrow
          showArrow={config.showBackArrow}
          goBackward={() => {
            goBackward(config, modalContext.setConfig);
          }}
        />

        <div
          style={{
            transform: `translateX(-${modalContext.config.translateUploadImgsX}px)`,
          }}
          ref={containerRef}
          className={`flex gap-3 relative ${styles["animatedTransition"]}`}
        >
          {modalContext.config.uploadedImgs.map((imgDetails, index) => {
            return (
              <Fragment key={imgDetails.cloudinary_public_id}>
                <UploadedImg
                  takeAction={(details) => {
                    uploadImgAction(details, index);
                  }}
                  deleteImg={() => {
                    deleteUploadedImg(
                      modalContext.setConfig,
                      imgDetails,
                      config.itemWidth,
                      setConfig,
                    );
                  }}
                  imgDetails={imgDetails}
                  index={index}
                />
              </Fragment>
            );
          })}
        </div>
        <NextArrow
          showArrow={config.showNextArrow}
          goForward={() => {
            goForward(config, modalContext.setConfig, setConfig);
          }}
        />
      </div>

      {!modalContext.config.uploadedImgs.length ? (
        <div className="font-bold flex items-between justify-center items-center absolute h-full w-full -z-10">
          <div></div>
          <div>No images are uploaded</div>
          <div></div>
        </div>
      ) : null}
    </>
  );
};
