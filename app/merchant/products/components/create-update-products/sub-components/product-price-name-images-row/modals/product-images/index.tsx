import {
  getDefaultProductImgsModalState,
  MainCreateUpdateProductContext,
  ProductImgsModalContext,
  productImgsModalState,
  setInitialProductImgModalState,
} from "@/app/merchant/products/helpers";
import { Button, Modal, ModalContent, ModalFooter } from "@nextui-org/react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { useContext, useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { MainModalBody } from "./modal-body";

export const ProductImages = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [config, setConfig] = useState<productImgsModalState>(
    getDefaultProductImgsModalState(),
  );
  const mainContext = useContext(MainCreateUpdateProductContext);
  const uploadRef = useRef<FileUploadWithPreview | null>(null);

  useEffect(() => {
    setInitialProductImgModalState(setConfig, mainContext?.config);
  }, [mainContext?.config?.id]);

  if (!mainContext) return null;
  const { setConfig: setMainConfig } = mainContext;
  return (
    <>
      <Modal
        size="5xl"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ProductImgsModalContext.Provider
            value={{
              config,
              setConfig,
              uploadRef,
              isOpen,
            }}
          >
            <MainModalBody />
          </ProductImgsModalContext.Provider>

          <ModalFooter>
            <div className="flex justify-end">
              <Button
                className="text-white"
                onPress={() => {
                  setMainConfig(
                    produce((draft) => {
                      draft.productImages = [
                        ...(uploadRef?.current?.cachedFileArray || []),
                        ...config.cachedFiles,
                      ];
                      draft.deletedImgs = produce(config.deletedImgs, () => {});
                      draft.uploadedImgs = produce(
                        config.uploadedImgs,
                        () => {},
                      );
                    }),
                  );
                  onOpenChange();
                }}
                color="warning"
              >
                Save
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
