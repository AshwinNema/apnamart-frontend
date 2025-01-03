import { ImageComponent } from "@/app/_custom-components";
import {
  deletedImgProps,
  ProductImgsModalContext,
} from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { MdSettingsBackupRestore } from "react-icons/md";
import useConfigManager from "./useConfigManager";
import { useRef, useContext } from "react";
import { produce } from "immer";
import { errorToast } from "@/app/_utils";
export const DeletedImg = ({
  imageDetails,
  config,
  handleImageIntersection,
  index,
  setConfig,
}: deletedImgProps) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const modalContext = useContext(ProductImgsModalContext);
  useConfigManager(containerRef, handleImageIntersection, index);

  return (
    <div ref={containerRef} className="flex items-center min-w-[250px]">
      <ImageComponent
        src={imageDetails.url}
        width={200}
        height={200}
        alt="Deleted image"
      />
      <Tooltip color="secondary" content={"Restore Image"}>
        <Button
          className="mt-3 bg-transparent"
          onPress={() => {
            if (!modalContext) return;
            setConfig(
              produce((draft) => {
                draft.hasInteracted = true;
              }),
            );
            const totalLength =
              (modalContext.uploadRef.current?.cachedFileArray?.length || 0) +
              modalContext.config.uploadedImgs.length +
              modalContext.config.cachedFiles.length;

            if (totalLength >= 20) {
              errorToast({
                msg: "You cannot upload more than 4 images. To upload a new image, you will have to remove one of the images you are newly trying to upload",
              });
              return;
            }
            modalContext.setConfig(
              produce((draft) => {
                const lastIndex = draft.deletedImgs.length - 1;
                draft.uploadedImgs.push(imageDetails);
                draft.deletedImgs = draft.deletedImgs.filter(
                  (newDeletedImgDetails) =>
                    imageDetails.cloudinary_public_id !==
                    newDeletedImgDetails.cloudinary_public_id,
                );
                draft.lastVisibleDeletedIndex = Math.min(
                  draft.lastVisibleDeletedIndex,
                  lastIndex,
                );
                draft.lastVisibleDeletedIndex = Math.max(
                  draft.lastVisibleDeletedIndex,
                  0,
                );
                if (draft.lastVisibleDeletedIndex === lastIndex) {
                  draft.translateDeletedImgsX = Math.max(
                    draft.translateDeletedImgsX - config.itemWidth,
                    0,
                  );
                  draft.lastVisibleDeletedIndex -= 1;
                }
              }),
            );
          }}
          radius="full"
        >
          <MdSettingsBackupRestore className="scale-[2]" />
        </Button>
      </Tooltip>
    </div>
  );
};