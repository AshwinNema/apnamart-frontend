import { Divider, useDisclosure } from "@nextui-org/react";
import { useContext } from "react";
import { MainContext } from "../../../helpers";
import { ImageComponent } from "@/app/_custom-components";
import { checkoutItem } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { CartItemBtns } from "./cart-item-btns";
import { DeleteModal } from "@/app/_custom-components/table/table-actions/delete-modal";
import { produce } from "immer";

export const OrderSummaryItem = ({
  index,
  item,
}: {
  index: number;
  item: checkoutItem;
}) => {
  const context = useContext(MainContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  if (!context) return null;
  const { config, setConfig } = context;
  const { details } = item;
  const itemLength = config.cartItems.length;

  return (
    <>
      <div className="flex gap-2 p-5">
        <ImageComponent
          src={details.photos[0].url}
          width={200}
          height={200}
          alt="Product Photo"
        />
        <div className="flex flex-col justify-between h-full min-h-[200px]">
          <div className="text-base">{details.name}</div>
          <div className="text-lg font-medium">₹{details.price}</div>
          <div className="flex gap-3 items-center">
            <CartItemBtns item={item} index={index} />
            <div
              onClick={() => {
                onOpen();
              }}
              className="hover:text-primary font-medium cursor-pointer"
            >
              REMOVE
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        deleteModalHeadertext="Remove Item"
        deleteBtnText="Remove"
        deleteBtnColor="primary"
        modalBodyMsg="Are you sure that you want to remove item"
        deleteData={() => {
          setConfig(
            produce((draft) => {
              draft.cartItems = draft.cartItems.filter(
                (cartItem) => cartItem.details.id !== item.details.id,
              );
            }),
          );
        }}
      />
      {index !== itemLength - 1 && <Divider />}
    </>
  );
};
