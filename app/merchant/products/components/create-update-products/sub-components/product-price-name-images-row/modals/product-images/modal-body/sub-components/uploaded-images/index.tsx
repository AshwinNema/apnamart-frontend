import {
  goBackward,
  goForward,
  ProductImgsModalContextType,
} from "@/app/merchant/products/helpers";
import React, { Fragment } from "react";
import { UploadedImg } from "./uploaded-img";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import useConfigManager from "./useConfigManager";

export const UploadedImages = ({modalContext}:{modalContext: ProductImgsModalContextType}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [config, setConfig, uploadImgAction] = useConfigManager(modalContext);
  return (
    <>
      <div className="relative overflow-hidden">
        {config.showBackArrow && (
          <Button
            onPress={() => {
              goBackward(config, modalContext.setConfig);
            }}
            radius="full"
            isIconOnly
            className={`absolute z-[10] top-[50%] text-center cursor-pointer flex justify-center items-center`}
          >
            <FaAngleLeft />
          </Button>
        )}
        <div
          style={{
            transform: `translateX(-${modalContext.config.translateUploadImgsX}px)`,
          }}
          ref={containerRef}
          className="flex gap-3 relative"
        >
          {modalContext.config.uploadedImgs.map((imgDetails, index) => {
            return (
              <Fragment key={imgDetails.cloudinary_public_id}>
                <UploadedImg
                  config={config}
                  setConfig={modalContext.setConfig}
                  takeAction={(details) => {
                    uploadImgAction(
                      details,
                      index,
                    );
                  }}
                  imgDetails={imgDetails}
                  index={index}
                />
              </Fragment>
            );
          })}
        </div>
        {config.showNextArrow && (
          <Button
            onPress={() => {
              goForward(config, modalContext.setConfig, setConfig);
            }}
            radius="full"
            isIconOnly
            className={`absolute z-[10] right-0 top-[50%] text-center cursor-pointer flex justify-center items-center`}
          >
            <FaAngleRight />
          </Button>
        )}
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
