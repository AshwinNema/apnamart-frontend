import {
  Events,
  FileUploadWithPreview,
  ImageAddedEvent,
  ImageDeletedEvent,
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
  customClass,
  imgDeletedCallBack,
  initialFiles,
  hideClearBtn,
}: ImgPreviewInputProps) => {
  const imgPreviewRef = useRef<FileUploadWithPreview | null>(null);
  const imageAdded = (e: Event) => {
    const { detail } = e as unknown as ImageAddedEvent;
    imgChangeCallback && imgChangeCallback(detail);
  };

  const clearButtonClicked = () => {
    clearCallback && clearCallback();
  };

  const imgDeleted = (e: Event) => {
    const { detail } = e as unknown as ImageDeletedEvent;
    imgDeletedCallBack && imgDeletedCallBack(detail);
  };
  useEffect(() => {
    window.addEventListener(Events.IMAGE_ADDED, imageAdded);
    window.addEventListener(Events.CLEAR_BUTTON_CLICKED, clearButtonClicked);
    window.addEventListener(Events.IMAGE_DELETED, imgDeleted);
    if (!imgPreviewRef.current) {
      const upload = new FileUploadWithPreview(dataUploadId, options);
      const remp = document.createElement("span");
      upload.clearButton = remp;
      value?.cachedFileArray && upload.addFiles(value.cachedFileArray);
      initialFiles && upload.addFiles(initialFiles);
      setUpload && setUpload(upload);
      imgPreviewRef.current = upload;
    }

    return () => {
      window.removeEventListener(Events.IMAGE_ADDED, imageAdded);
      window.removeEventListener(Events.IMAGE_DELETED, imgDeleted);
      window.removeEventListener(
        Events.CLEAR_BUTTON_CLICKED,
        clearButtonClicked,
      );
    };
  }, []);

  return (
    <div
      className={`custom-file-container ${customClass || ""} ${hideClearBtn && "hide-img-clear-icon"}`}
      data-upload-id={dataUploadId}
    >
      {" "}
    </div>
  );
};

export default ImgPreviewInput;
