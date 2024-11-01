import { ProductImgsModalContext } from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { useContext } from "react";
import { produce } from "immer";
import { ImageComponent } from "@/app/_custom-components";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const UploadedImages = () => {
  const modalContext = useContext(ProductImgsModalContext);
  if (!modalContext) return null;
  const { config, setConfig } = modalContext;
  return (
    <>
      <div className="flex gap-3">
        {config.uploadedImgs.map((imgDetails) => {
          return (
            <div
              className="flex gap-3 items-center"
              key={imgDetails.cloudinary_public_id}
            >
              <ImageComponent
                src={imgDetails.url}
                width={200}
                height={200}
                alt="Uploaded image"
              />
              <div className="flex justify-between break-all">
                <p>{imgDetails.name}</p>
                <Tooltip color="danger" content="Remove uploaded image">
                  <Button
                    onPress={() => {
                      setConfig(
                        produce((draft) => {
                          draft.deletedImgs.push(imgDetails);
                          draft.uploadedImgs = draft.uploadedImgs.filter(
                            (newUploadedImgDetails) =>
                              imgDetails.cloudinary_public_id !==
                              newUploadedImgDetails.cloudinary_public_id,
                          );
                        }),
                      );
                    }}
                    isIconOnly={true}
                    className="bg-transparent"
                  >
                    <RiDeleteBin6Fill className="fill-dangerTheme scale-[1.3]" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>

      {!config.uploadedImgs.length ? (
        <div className="font-bold flex items-between justify-center items-center absolute h-full w-full -z-10">
          <div></div>
          <div>No images are uploaded</div>
          <div></div>
        </div>
      ) : null}
    </>
  );
};
