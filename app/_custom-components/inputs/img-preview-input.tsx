import {
  Events,
  FileUploadWithPreview,
  Options,
} from "file-upload-with-preview";
import "file-upload-with-preview/dist/style.css";
import { useEffect, useRef } from "react";
import { ImgPreviewInputProps } from "./interface";

export const ImgPreviewInput = ({
  setUpload,
  dataUploadId,
  options,
  imgChangeCallback,
  clearCallback,
  value,
}: ImgPreviewInputProps) => {
  const imgPreviewRef = useRef<FileUploadWithPreview | null>(null);
  const imageAdded = (e: Event) => {
    imgChangeCallback && imgChangeCallback();
  };

  const clearButtonClicked = () => {
    clearCallback && clearCallback();
  };
  useEffect(() => {
    window.addEventListener(Events.IMAGE_ADDED, imageAdded);
    window.addEventListener(Events.CLEAR_BUTTON_CLICKED, clearButtonClicked);
    if (!imgPreviewRef.current) {
      const upload = new FileUploadWithPreview(dataUploadId, options);
      value?.cachedFileArray && upload.addFiles(value.cachedFileArray);
      setUpload(upload);
      imgPreviewRef.current = upload;
    }

    return () => {
      window.removeEventListener(Events.IMAGE_ADDED, imageAdded);
      window.removeEventListener(
        Events.CLEAR_BUTTON_CLICKED,
        clearButtonClicked,
      );
    };
  }, []);

  return (
    <div className="custom-file-container" data-upload-id={dataUploadId}>
      {" "}
    </div>
  );
};

export default ImgPreviewInput;
