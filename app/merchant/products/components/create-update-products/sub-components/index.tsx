import { ImgPreviewInput } from "@/app/_custom-components";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { Dispatch, SetStateAction } from "react";

export * from "./autocompletes";
export * from "./specifications"

export const FileUpload = ({
  setUpload,
  upload,
}: {
  upload: FileUploadWithPreview | null;
  setUpload: Dispatch<SetStateAction<FileUploadWithPreview | null>>;
}) => {
  return (
    <ImgPreviewInput
      customClass="mb-3"
      setUpload={setUpload}
      options={{
        multiple: true,
      }}
      value={upload}
      dataUploadId="product images"
    />
  );
};
