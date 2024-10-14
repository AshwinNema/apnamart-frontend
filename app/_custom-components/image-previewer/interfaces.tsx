import { ReactNode } from "react";
import { ImgPreviewInputProps } from "../inputs/interface";

// showImage - When we have uploaded the image first, then we first directly show the image instead of upload input
// imgSrc - When we have uploaded an image, this is the uploaded url for that image
// height - Height of the already uploaded image
// width - Width of the already uploaded image
// imgAlt - alt for the image already uploaded
// imgInputProps - for documentation please refer ImgPreviewInputProps
// openInputAlertMsg - When we try to change an image that was already uploaded,we show an alert toast to the user regarding next steps
// showUpdateSaveImgBtn - When we have already uploaded a file, we can control that we have to show btn to upload new image
// openInput - For opening image input instead of preview image.This function should set the following values:
// showImage: false,
// showUpdateSaveImgBtn: false,
// cancelUpload - This function is specifically used when we are trying
// to update the uploaded file and not create the file and does the following -
// 1. Resetting panel - upload?.resetPreviewPanel()
// 2. sets showImage = true and showUpdateSaveImgBtn = false
// In imgInputProps
//    in imgChangeCallback - please make showUpdateSaveImgBtn true
//    In clearCallback     - please make showUpdateSaveImgBtn false
// uploadFile - Function for uploading file to the server.
export interface ImageViewerProps {
  showImage?: boolean;
  showImgChangeBtn?: boolean;
  imgSrc?: string;
  height: number;
  width: number;
  imgAlt: string;
  imgInputProps: ImgPreviewInputProps;
  openInputAlertMsg?: ReactNode;
  showUpdateSaveImgBtn: boolean;
  openInput: () => void;
  cancelUpload: () => void;
  uploadFile: () => void;
}
