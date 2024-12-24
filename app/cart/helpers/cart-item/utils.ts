import { errorToast } from "@/app/_utils";
import { cartProduct, setCartItemBtnConfig, setMainConfig } from "..";
import { produce } from "immer";

export const cartItemHelpers = (
  setCartConfig: setCartItemBtnConfig,
  product: cartProduct,
  setConfig: setMainConfig,
) => {
  let timerId: NodeJS.Timeout | null = null;
  const startEndLoad = (isLoading: boolean) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    isLoading &&
      setCartConfig(
        produce((draft) => {
          draft.isLoading = isLoading;
        }),
      );

    if (!isLoading) {
      timerId = setTimeout(() => {
        setCartConfig(
          produce((draft) => {
            draft.isLoading = isLoading;
          }),
        );
      }, 2000);
    }
  };
  const updateCartVal = (quantity?: number, change?: 1 | -1) => {
    setConfig(
      produce((draft) => {
        const itemIndex = draft.products.findIndex(
          (item) => item.details.id === product.details.id,
        );
        if (quantity) {
          draft.products[itemIndex].count = quantity;
        }
        if (change) {
          draft.products[itemIndex].count += change;
        }
      }),
    );
  };

  const quantityExceedErr = () => {
    errorToast({
      msg: `You can order only ${product.details.allowedUnitsPerOrder} units of the ${product.details.name}`,
    });
  };

  const belowPermissibleLimits = () => {
    errorToast({
      msg: `Count of item cannot be less than one`,
    });
  };

  return {
    startEndLoad,
    updateCartVal,
    quantityExceedErr,
    belowPermissibleLimits,
  };
};
