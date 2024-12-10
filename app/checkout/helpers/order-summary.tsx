import { checkoutItem } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { setMainConfig } from "./interfaces & enums & constants";
import { produce } from "immer";
import { errorToast } from "@/app/_utils";
import { Dispatch, SetStateAction } from "react";

export const cartItemHelpers = <T extends { count: string }>(
  item: checkoutItem,
  setConfig: setMainConfig,
  index: number,
  setCartConfig: Dispatch<SetStateAction<T>>,
) => {
  const setInputVal = (val: string) => {
    !val &&
      setCartConfig(
        produce((draft: { count: string }) => {
          draft.count = "";
        }),
      );

    if (!val || val === "-") return;

    const numberVal = Number(val);
    if (numberVal > item.details.allowedUnitsPerOrder) {
      errorToast({
        msg: `You can order only ${item.details.allowedUnitsPerOrder} units of the ${item.details.name}`,
      });
      return;
    }
    if (numberVal <= 0) {
      errorToast({ msg: "Count of the product cannot be less than 1" });
      return;
    }
    setCartConfig(
      produce((draft: { count: string }) => {
        draft.count = `${numberVal}`;
      }),
    );
  };

  const increaseDecreaseItemCount = (change: -1 | 1) => () => {
    switch (change) {
      case -1:
        if (item.count == 1) {
          errorToast({ msg: "Count of the product cannot be less than 1" });
          return;
        }
        break;
      case 1:
        if (item.count === item.details.allowedUnitsPerOrder) {
          errorToast({
            msg: `You can order only ${item.details.allowedUnitsPerOrder} units of the ${item.details.name}`,
          });
          return;
        }
      default:
        break;
    }
    setConfig(
      produce((draft) => {
        const item = draft.cartItems[index];
        const {
          count,
          details: { allowedUnitsPerOrder },
        } = item;
        const newCount = count + change;
        const isValidCount = 1 <= newCount && newCount <= allowedUnitsPerOrder;
        if (!isValidCount) return;
        draft.cartItems[index].count += change;
      }),
    );
  };
  return { increaseDecreaseItemCount, setInputVal };
};
