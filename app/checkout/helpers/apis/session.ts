import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { paymentOptions } from "../interfaces & enums & constants";

export const endCheckoutSession = (sessionId: number) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.END_CHECKOUT_SESSION + sessionId,
    undefined,
    undefined,
    {
      showToast: false,
    },
  )
    .then((res) => {})
    .catch((err) => {});
};

export const changeCheckoutItemQuantity = (
  itemId: number,
  details: {
    quantity?: number;
    change?: -1 | 1;
  },
  onSuccess?: (quantity: number) => void,
  onOperationComplete?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    appEndPoints.CHANGE_CHECKOUT_ITEM_QUANTITY + itemId,
    details,
    undefined,
    { showLoader: false },
  )
    .then((res) => {
      if (!res) return;
      onSuccess && onSuccess(res.quantity);
    })
    .catch((err) => {})
    .finally(() => {
      onOperationComplete && onOperationComplete();
    });
};

export const removeCheckoutItem = (itemId: number, onSuccess?: () => void) => {
  makeDataRequest(
    HTTP_METHODS.DELETE,
    `${appEndPoints.REMOVE_CHECKOUT_ITEM}${itemId}`,
  )
    .then((res) => {
      if (!res) return;
      onSuccess && onSuccess();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changePaymentMode = (
  sessionId: number,
  paymentMode: paymentOptions,
  onSuccess?: (res: {
    razorPayOrderId?: string;
    stripePaymentId?: string;
    totalPrice: number;
    stripeClientSecret?: string;
  }) => void,
) => {
  makeDataRequest(
    HTTP_METHODS.PUT,
    `${appEndPoints.CHANGE_CHECKOUT_PAYMENT_MODE}${sessionId}`,
    { paymentMode },
  )
    .then((res) => {
      if (!res) return;
      onSuccess && onSuccess(res);
    })
    .catch((err) => {});
};
