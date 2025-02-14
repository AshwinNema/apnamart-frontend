import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { CreateUpdateProductFilterModal } from "./modals/product-filter-modal";
import { MainCreateUpdateProductContext } from "@/app/merchant/products/helpers";
import { errorToast } from "@/app/_utils";
import { ProductImages } from "./modals/product-images";
import { LuFileImage } from "react-icons/lu";

export const ProductFilterAndImages = () => {
  const {
    isOpen: isProductFilterModalOpen,
    onOpen: onProductFilterModalOpen,
    onOpenChange: inProductFilterModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductImagesModalOpen,
    onOpenChange: onProductImagesModalOpenChange,
    onOpen: onProductImagesModalOpen,
  } = useDisclosure();

  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config } = mainContext;
  return (
    <>
      <Tooltip color="secondary" content="View/ Upload new product images">
        <Button
          onPress={onProductImagesModalOpen}
          className="bg-transparent"
          isIconOnly
        >
          <LuFileImage className="scale-[2.5]" />
        </Button>
      </Tooltip>
      {isProductImagesModalOpen && (
        <ProductImages
          isOpen={isProductImagesModalOpen}
          onOpenChange={onProductImagesModalOpenChange}
        />
      )}

      <Tooltip
        color="foreground"
        content={"View/Update all item search filters"}
      >
        <Button
          onPress={() => {
            let err: string | null = null;
            if (!config.itemId) err = "Please select item first";
            if (!config.categoryId) err = "Please select category first";
            if (err) {
              errorToast({ msg: err });
              return;
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
    </>
  );
};
