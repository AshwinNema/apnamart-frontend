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
import { MutableRefObject, useContext } from "react";
import { LuFileImage } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";
import { CreateUpdateProductFilterModal } from "./product-filter-modal";
import { MainCreateUpdateProductContext } from "@/app/merchant/products/helpers";
import { errorToast } from "@/app/_utils";

export const ProductFilterAndImages = ({
  uploadRef,
}: {
  uploadRef: MutableRefObject<FileUploadWithPreview | null>;
}) => {
  const {
    isOpen: isProductImgsModalOpen,
    onOpen: onProductImgsModalOpen,
    onOpenChange: onProductImgsModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductFilterModalOpen,
    onOpen: onProductFilterModalOpen,
    onOpenChange: inProductFilterModalOpenChange,
  } = useDisclosure();
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <>
      <Tooltip color="secondary" content="View/ Upload new product images">
        <Button
          onPress={onProductImgsModalOpen}
          className="bg-transparent"
          isIconOnly
        >
          <LuFileImage className="scale-[2.5]" />
        </Button>
      </Tooltip>
      <Tooltip
        color="foreground"
        content={"View/Update all item search filters"}
      >
        <Button
          onPress={() => {
            let err:string | null = null
            if (!config.itemId) err = "Please select item first"
            if (!config.categoryId) err = "Please select category first"
            if (err) {
              errorToast({msg:err})
              return
            }
            onProductFilterModalOpen();
          }}
          className="bg-transparent"
        >
          <FaFilter className="scale-[2]" />
        </Button>
      </Tooltip>
      <CreateUpdateProductFilterModal
        isOpen={isProductFilterModalOpen}
        onOpenChange={inProductFilterModalOpenChange}
      />
      <Modal
        size="5xl"
        hideCloseButton
        isOpen={isProductImgsModalOpen}
        onOpenChange={onProductImgsModalOpenChange}
      >
        <ModalContent>
          <ModalBody>
            <ImgPreviewInput
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
