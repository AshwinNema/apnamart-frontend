import { ImageComponent } from "@/app/_custom-components";
import { cartProduct, MainContext } from "../../helpers";
import { Button, CardBody, Divider, useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { CartItemBtns } from "./item-buttons";
import { useRouter } from "next/navigation";
import { addRemoveCartProduct } from "@/app/view-product/[id]/helpers";
import { DeleteModal } from "@/app/_custom-components/table/table-actions/delete-modal";
import { produce } from "immer";
import { useAppDispatch } from "@/lib/main/hooks";
import { setCartCount } from "@/lib/main/slices/cart-count/cart-count.slice";
import { successToast } from "@/app/_utils";

export const CartItem = ({
  product,
  index,
}: {
  index: number;
  product: cartProduct;
}) => {
  const { details } = product;
  const router = useRouter();
  const context = useContext(MainContext);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  if (!context) return null;
  const { config, setConfig } = context;
  return (
    <CardBody>
      <div className="flex gap-2 h-full mt-3 mb-5">
        <ImageComponent
          src={details.photos[0].url}
          width={200}
          height={200}
          className="cursor-pointer min-w-[200px]"
          alt="Product Photo"
          onImgClick={() => {
            router.push(`/view-product/${details.id}`);
          }}
        />
        <div className="flex flex-col justify-between h-full">
          <div
            onClick={() => {
              router.push(`/view-product/${details.id}`);
            }}
            className="text-base hover:text-primary cursor-pointer"
          >
            {details.name}
          </div>
          <div className="text-lg font-medium">₹{details.price}</div>
          <div
            className={`${config.innerWidth > 830 && "flex gap-3 items-center "}`}
          >
            <CartItemBtns product={product} />
            <div
              onClick={() => {
                onOpen();
              }}
              className={`hover:text-primary font-medium cursor-pointer ${config.innerWidth <= 830 && "mt-5 flex ml-8"}`}
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
          addRemoveCartProduct(
            details.id,
            { connect: false },
            undefined,
            (count) => {
              successToast({ msg: "Item removed from the cart" });
              dispatch(setCartCount(count));
              setConfig(
                produce((draft) => {
                  draft.products = draft.products.filter(
                    (productDetails) =>
                      productDetails.details.id !== product.details.id,
                  );
                }),
              );
              onClose();
            },
          );
        }}
      />

      {index !== config.products.length - 1 && <Divider />}
    </CardBody>
  );
};
