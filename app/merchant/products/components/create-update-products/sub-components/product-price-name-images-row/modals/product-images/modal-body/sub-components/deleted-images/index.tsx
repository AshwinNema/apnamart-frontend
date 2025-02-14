import { ProductImgsModalContextType } from "@/app/merchant/products/helpers";
import { Button } from "@heroui/react";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { produce } from "immer";
import useConfigManager from "./useConfigManager";
import { FaAngleRight } from "react-icons/fa";
import { DeletedImg } from "./deleted-img";
import styles from "@/app/styles.module.css";
import { BackArrow } from "@/app/_custom-components";

export const DeletedImgViewer = ({
  setViewImgsState,
  modalContext,
}: {
  setViewImgsState: Dispatch<SetStateAction<"uploaded" | "deleted">>;
  modalContext: ProductImgsModalContextType;
}) => {
  const [config, setConfig, handleImageIntersection, goForward] =
    useConfigManager();
  useEffect(() => {
    modalContext?.config?.deletedImgs?.length === 0 &&
      setViewImgsState("uploaded");
  }, [modalContext?.config?.deletedImgs]);

  if (!modalContext?.config?.deletedImgs?.length) return null;
  return (
    <div className="relative overflow-hidden">
      <BackArrow
        showArrow={config.showBackArrow}
        goBackward={() => {
          modalContext.setConfig(
            produce((draft) => {
              draft.lastVisibleDeletedIndex = Math.max(
                draft.lastVisibleDeletedIndex - config.totalVisibleElements,
                config.totalVisibleElements - 1,
              );
              draft.translateDeletedImgsX = Math.max(
                draft.translateDeletedImgsX - config.scrollWidth,
                0,
              );
            }),
          );
        }}
      />
      <div
        style={{
          transform: `translateX(-${modalContext.config.translateDeletedImgsX}px)`,
        }}
        className={`flex gap-3 relative ${styles["animatedTransition"]}`}
      >
        {modalContext.config.deletedImgs.map((imageDetails, index) => {
          return (
            <Fragment key={imageDetails.cloudinary_public_id}>
              <DeletedImg
                index={index}
                imageDetails={imageDetails}
                config={config}
                handleImageIntersection={handleImageIntersection}
                setConfig={setConfig}
              />
            </Fragment>
          );
        })}
      </div>

      {config.showNextArrow && (
        <Button
          onPress={() => {
            goForward();
          }}
          radius="full"
          isIconOnly
          className={`absolute z-[10] right-0 top-[50%] text-center cursor-pointer flex justify-center items-center`}
        >
          <FaAngleRight />
        </Button>
      )}
    </div>
  );
};
