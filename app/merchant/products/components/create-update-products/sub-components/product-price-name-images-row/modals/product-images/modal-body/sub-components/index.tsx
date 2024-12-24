import {
  MainCreateUpdateProductContext,
  ProductImgsModalContext,
} from "@/app/merchant/products/helpers";
import { useContext } from "react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { ImgPreviewInput } from "@/app/_custom-components";
import { produce } from "immer";

export * from "./uploaded-images";
export * from "./upload-view-img-toggler";
export * from "./deleted-images";

export const ImgUpload = ({
  allowedImgsLength,
}: {
  allowedImgsLength: number;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const modalContext = useContext(ProductImgsModalContext);

  if (!mainContext || !modalContext) return null;
  const { uploadRef, config, setConfig } = modalContext;
  return (
    <ImgPreviewInput
      customClass="mb-3"
      value={uploadRef.current}
      setUpload={(uploader: FileUploadWithPreview) => {
        uploadRef.current = uploader;
        uploader.addFiles([...config.productImages, ...config.cachedFiles]);
        setConfig(
          produce((draft) => {
            draft.productImages = [];
            draft.cachedFiles = [];
          }),
        );
      }}
      options={{
        multiple: true,
        maxFileCount: allowedImgsLength,
        text: {
          label: `Upload product images (Maximum ${allowedImgsLength} images allowed)`,
        },
      }}
      dataUploadId="product images"
    />
  );
};
