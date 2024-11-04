import { uploadedImgDetails } from "@/app/merchant/products/helpers";
import { useEffect, useRef } from "react";
import { ImageComponent } from "..";

export const ImgViewer = ({
  file,
  uploadedImg,
  alt,
}: {
  file?: File;
  uploadedImg?: uploadedImgDetails | null;
  alt: string;
}) => {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!imgContainerRef.current || !file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (file.type.startsWith("image/")) {
        if (!imgContainerRef.current) return;
        imgContainerRef.current.style.backgroundImage = `url("${fileReader.result}")`;
      }
    };
  }, [file]);
  return (
    <>
      {file || uploadedImg ? (
        <div className="mb-3">
          {file ? (
            <div className="h-full min-h-[200px] bg-no-repeat bg-cover bg-center" ref={imgContainerRef}></div> 
          ) : null}
          {uploadedImg ? (
            <div className="flex justify-center">
              <ImageComponent
                width={200}
                height={200}
                alt={`${alt}`}
                src={`${uploadedImg.url}`}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
