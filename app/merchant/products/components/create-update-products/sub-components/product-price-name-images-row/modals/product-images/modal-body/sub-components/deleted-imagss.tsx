import { ImageComponent } from "@/app/_custom-components";
import { ProductImgsModalContext } from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { produce } from "immer";
import { MdSettingsBackupRestore } from "react-icons/md";
import { errorToast } from "@/app/_utils";

export const DeletedImgViewer = ({
  setViewImgsState,
}: {
  setViewImgsState: Dispatch<SetStateAction<"uploaded" | "deleted">>;
}) => {
  const modalContext = useContext(ProductImgsModalContext);
  if (!modalContext) return null;
  useEffect(() => {
    modalContext?.config?.deletedImgs?.length === 0 &&
      setViewImgsState("uploaded");
  }, [modalContext?.config?.deletedImgs]);
  const { config, setConfig, uploadRef } = modalContext;
  if (!config.deletedImgs.length) return null;
  return (
    <>
      <div className="flex gap-3">
        {config.deletedImgs.map((imageDetails) => {
          return (
            <div
              className="flex items-center"
              key={imageDetails.cloudinary_public_id}
            >
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
                    const totalLength =
                      (uploadRef.current?.cachedFileArray?.length || 0) +
                      config.uploadedImgs.length +
                      config.cachedFiles.length;

                    if (totalLength >= 20) {
                      errorToast({
                        msg: "You cannot upload more than 4 images. To upload a new image, you will have to remove one of the images you are newly trying to upload",
                      });
                      return;
                    }
                    setConfig(
                      produce((draft) => {
                        draft.uploadedImgs.push(imageDetails);
                        draft.deletedImgs = draft.deletedImgs.filter(
                          (newDeletedImgDetails) =>
                            imageDetails.cloudinary_public_id !==
                            newDeletedImgDetails.cloudinary_public_id,
                        );
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
        })}
      </div>
    </>
  );
};
