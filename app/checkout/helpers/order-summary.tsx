import {
  setMainConfig,
  cartCheckoutItem,
} from "./interfaces & enums & constants";
import { produce } from "immer";
import { Dispatch, SetStateAction } from "react";
import { changeCheckoutItemQuantity } from "./apis";

export const cartItemHelpers = (
  item: cartCheckoutItem,
  setConfig: setMainConfig,
  index: number,
  setCartConfig: Dispatch<
    SetStateAction<{ count: string; isLoading: boolean }>
  >,
) => {
  const updateCartItemQuantity = (change?: -1 | 1, quantity?: number) => {
    setCartConfig(
      produce((draft) => {
        draft.isLoading = true;
      }),
    );

    const body: { change?: -1 | 1; quantity?: number } = {};
    if (change) body.change = change;
    if (quantity) body.quantity = quantity;
    changeCheckoutItemQuantity(
      item.id,
      body,
      (quantity) => {
        setConfig(
          produce((draft) => {
            draft.cartItems[index].quantity = quantity;
          }),
        );
      },
      () => {
        setCartConfig(
          produce((draft) => {
            draft.isLoading = false;
          }),
        );
      },
    );
  };

  const setInputVal = (val: string) => {
    !val &&
      setCartConfig(
        produce((draft: { count: string }) => {
          draft.count = "";
        }),
      );

    if (!val || val === "-") return;

    const numberVal = Number(val);
    updateCartItemQuantity(undefined, numberVal);
  };

  const increaseDecreaseItemCount = (change: -1 | 1) => () => {
    updateCartItemQuantity(change);
  };
  return { increaseDecreaseItemCount, setInputVal };
};
