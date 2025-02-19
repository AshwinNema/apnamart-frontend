import {
  MainCreateUpdateProductContext,
  ProductImgsModalContext,
} from "@/app/merchant/products/helpers";
import { ModalBody } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import {
  DeletedImgViewer,
  ImgUpload,
  UploadViewImgToggler,
  UploadedImages,
} from "./sub-components";

export const MainModalBody = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const modalContext = useContext(ProductImgsModalContext);
  const [isloaded, setIsLoaded] = useState(false);
  const [viewImgsState, setViewImgsState] = useState<"uploaded" | "deleted">(
    "uploaded",
  );
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setViewImgsState("uploaded");
  }, [modalContext?.isOpen]);

  if (!mainContext || !modalContext) return null;
  const { config, setConfig } = modalContext;

  return (
    <ModalBody>
      <UploadViewImgToggler
        viewImgsState={viewImgsState}
        setViewImgsState={setViewImgsState}
        setConfig={setConfig}
      />
      {config.view === "upload images" ? (
        <>
          {isloaded && (
            <ImgUpload allowedImgsLength={20 - config?.uploadedImgs?.length} />
          )}
        </>
      ) : (
        <>
          {viewImgsState === "uploaded" && (
            <UploadedImages modalContext={modalContext} />
          )}
          {viewImgsState === "deleted" && (
            <DeletedImgViewer
              setViewImgsState={setViewImgsState}
              modalContext={modalContext}
            />
          )}
        </>
      )}
    </ModalBody>
  );
};
