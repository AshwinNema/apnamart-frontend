import { ImgPreviewInput } from "@/app/_custom-components";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { MutableRefObject, SetStateAction } from "react";
import { LuFileImage } from "react-icons/lu";

export const ProductImages = ({
  uploadRef,
}: {
  uploadRef: MutableRefObject<FileUploadWithPreview | null>;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip color="secondary" content="View/ Upload new product images">
        <Button onPress={onOpen} className="bg-transparent" isIconOnly>
          <LuFileImage className="scale-[2.5]" />
        </Button>
      </Tooltip>
      <Modal
        size="5xl"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalBody>
            <ImgPreviewInput
              imgChangeCallback={(e) => {
                e.uploadedDate = new Date();
              }}
              customClass="mb-3"
              setUpload={(uploader: FileUploadWithPreview) => {
                uploadRef.current = uploader;
              }}
              options={{
                multiple: true,
                maxFileCount: 4,
                text: {
                  label: "Upload product image",
                },
              }}
              value={uploadRef.current}
              dataUploadId="product images"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
