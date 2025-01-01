import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { checkoutItem } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { setMainConfig } from "../interfaces & enums & constants";
import { produce } from "immer";
import { addressType } from "@/lib/profile/slices/address-slice";

export * from "./session";
export * from "./payment";

export const updateDeliveryArea = (
  sessionId: number,
  details: {
    latitude: number;
    longtitude: number;
    addressType?: addressType;
    addressLine1?: string;
    addressLine2?: string;
    otherAddress?: string;
  },
  onSuccess?: () => void,
  onFailure?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.UPDATE_CHECKOUT_DELIVERY_ADDRESS + sessionId,
    details,
  )
    .then((res) => {
      !res && onFailure && onFailure();
      res && onSuccess && onSuccess();
    })
    .catch(() => {
      onFailure && onFailure();
    });
};

export const createCheckoutSession = (
  items: checkoutItem[],
  setConfig: setMainConfig,
  onOperationComplete?: () => void,
) => {
  const params: {
    items?: {
      quantity: number;
      productId: number;
    }[];
  } = {};

  if (items.length) {
    params.items = items.map(({ details, count }) => {
      return {
        quantity: count,
        productId: details.id,
      };
    });
  }

  makeDataRequest(
    HTTP_METHODS.POST,
    appEndPoints.CREATE_CHECKOUT_SESSION,
    params,
    undefined,
    {
      showToast: false,
    },
  )
    .then((res) => {
      if (!res) return;
      if (typeof res?.address?.latitude === "string") {
        res.address.latitude = Number(res.address.latitude);
      }
      if (typeof res?.address?.longtitude === "string") {
        res.address.longtitude = Number(res.address.longtitude);
      }

      setConfig(
        produce((draft) => {
          draft.address = res.address;
          draft.checkoutId = res.id;
          draft.cartItems = res.items;
        }),
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      onOperationComplete && onOperationComplete();
    });
};
