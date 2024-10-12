import { Button } from "@nextui-org/react";
import { ImageComponent, ImgPreviewInput } from "..";
import { ImageViewerProps } from "./interfaces";
import { infoToast } from "@/app/_utils";
// For more information regarding props please refer ImageViewerProps
const CustomImagePreviewer = (props: ImageViewerProps) => {
  return (
    <>
      {props.showImage ? (
        <div className="flex justify-center">
          <ImageComponent
            src={props.imgSrc as string}
            height={props.height}
            width={props.width}
            alt={props.imgAlt}
          />
        </div>
      ) : (
        <ImgPreviewInput {...props.imgInputProps} />
      )}
      {props.imgSrc ? (
        <div className="flex justify-center mt-4">
          {props.showImage ? (
            <>
              {props.showImgChangeBtn ? (
                <>
                  <Button
                    onClick={() => {
                      infoToast({
                        msg: props.openInputAlertMsg || (
                          <p>
                            Please browse your image and click on{" "}
                            <span className="font-bold">Upload Image</span> to
                            upload image or click on{" "}
                            <span className="font-bold">Cancel Upload</span> to
                            cancel image upload
                          </p>
                        ),
                      });
                      props.openInput();
                    }}
                    color="primary"
                  >
                    Change Image
                  </Button>
                </>
              ) : null}
            </>
          ) : (
            <div className="flex gap-4">
              {props.showUpdateSaveImgBtn ? (
                <Button
                  onClick={props.uploadFile}
                  radius="full"
                  color="primary"
                >
                  Upload Image
                </Button>
              ) : null}
              <Button
                variant="solid"
                color="danger"
                radius="full"
                onClick={props.cancelUpload}
              >
                Cancel Upload
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CustomImagePreviewer;
