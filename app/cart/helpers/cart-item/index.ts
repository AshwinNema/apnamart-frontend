import { errorToast } from "@/app/_utils";
import {
  cartProduct,
  increaseDecreaseCartItemCount,
  setCartItemBtnConfig,
  setMainConfig,
} from "..";
import { produce } from "immer";
import { cartItemHelpers } from "./utils";

export const cartItemMethods = (
  setCartConfig: setCartItemBtnConfig,
  product: cartProduct,
  setConfig: setMainConfig,
) => {
  const { startEndLoad, updateCartVal, quantityExceedErr } = cartItemHelpers(
    setCartConfig,
    product,
    setConfig,
  );

  const setInputVal = (val: string) => {
    !val &&
      setCartConfig(
        produce((draft) => {
          draft.count = "";
        }),
      );
    if (!val || val === "-") return;

    if (val && Number(val) > product.details.allowedUnitsPerOrder) {
      quantityExceedErr();
      return;
    }
    startEndLoad(true);
    increaseDecreaseCartItemCount(
      product.details.id,
      {
        quantity: Number(val),
      },
      () => {
        updateCartVal(Number(val));
      },
      () => startEndLoad(false),
    );
  };

  const increaseDecreaseCartItem = (change: -1 | 1) => {
    switch (change) {
      case -1:
        if (product.count === 1) {
          errorToast({ msg: "Count of the product cannot be less than 1" });
          return;
        }
        break;

      case 1:
        if (product.count === product.details.allowedUnitsPerOrder) {
          quantityExceedErr();
          return;
        }
        break;

      default:
        break;
    }

    startEndLoad(true);

    increaseDecreaseCartItemCount(
      product.details.id,
      {
        change,
      },
      (res) => {
        updateCartVal(res.cartItems[product.details.id]);
      },
      () => startEndLoad(false),
    );
  };

  return {
    setInputVal,
    increaseDecreaseCartItem,
  };
};
