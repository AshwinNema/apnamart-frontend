import { BsHighlights } from "react-icons/bs";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import { ProductHighlights } from "../modals/product-highlights";

export const HighlightPoints = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  return (
    <>
      <Tooltip
        className="text-white"
        color="warning"
        content="View/Add Product Highlight Points"
      >
        <Button onPress={onOpen} className="bg-transparent" isIconOnly>
          <BsHighlights className="scale-[2.5] rotate-90 mx500:scale-[1.5]" />
        </Button>
      </Tooltip>
      <ProductHighlights isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
