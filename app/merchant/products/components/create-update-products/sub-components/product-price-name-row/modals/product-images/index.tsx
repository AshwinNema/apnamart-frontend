import { ImgPreviewInput } from "@/app/_custom-components";
import { MainCreateUpdateProductContext } from "@/app/merchant/products/helpers";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { useContext, useRef } from "react";
import { produce } from "immer";

export const ProductImages = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const uploadRef = useRef<FileUploadWithPreview | null>(null);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <>
      <Modal
        size="5xl"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalBody>
            <ImgPreviewInput
              customClass="mb-3"
              initialFiles={config.productImages}
              setUpload={(uploader: FileUploadWithPreview) => {
                uploadRef.current = uploader;
              }}
              options={{
                multiple: true,
                maxFileCount: 4,
                text: {
                  label: "Upload product images (Maximum 4 images allowed)",
                },
              }}
              dataUploadId="product images"
            />
          </ModalBody>

          <ModalFooter>
            <div className="flex justify-end">
              <Button
                className="text-white"
                onPress={() => {
                  setConfig(
                    produce((draft) => {
                      draft.productImages =
                        uploadRef?.current?.cachedFileArray || [];
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
