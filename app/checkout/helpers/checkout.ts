import { UserInterface } from "@/lib/main/slices/user/user.slice";
import {
  changePaymentMode,
  MainContextType,
  paymentOptions,
  verifyRazorpaypayment,
} from ".";
import { produce } from "immer";
import { getLocalStorageKey, storageAttributes } from "@/app/_services";
import { browserTheme } from "@/app/layout-components/theme-switch";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const changeCheckoutPaymentMethod = (
  paymentType: paymentOptions,
  context: MainContextType,
  user: UserInterface,
  onPaymentSuccess: () => void,
) => {
  changePaymentMode(context.config.checkoutId as number, paymentType, (res) => {
    switch (paymentType) {
      case paymentOptions.razorpay:
        if (res.razorPayOrderId) {
          const isDarkTheme =
            getLocalStorageKey(storageAttributes.theme) === browserTheme.dark;
          const additionalOptions: {
            theme?: {
              color: string;
            };
          } = {};
          if (isDarkTheme) {
            additionalOptions.theme = {
              color: "#30313d",
            };
          }
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_ID,
            amount: res.totalPrice * 100,
            currency: "INR",
            name: "Apnamart",
            order_id: res.razorPayOrderId,
            prefill: {
              name: user.name,
              email: user.email,
            },
            handler: (response: {
              razorpay_payment_id: string;
              razorpay_order_id: string;
              razorpay_signature: string;
            }) => {
              verifyRazorpaypayment(response, onPaymentSuccess);
            },
            ...additionalOptions,
          };
          const razorPay = new window.Razorpay(options);
          razorPay.open();
        }
        break;

      case paymentOptions.stripe:
        res.stripeClientSecret &&
          context.setConfig(
            produce((draft) => {
              draft.stripeClientSecret = res.stripeClientSecret;
            }),
          );

        break;
      default:
        break;
    }
    context.notifier.next({
      type: "payment mode change",
      details: paymentType,
    });
    context.setConfig(
      produce((draft) => {
        draft.paymentMode = paymentType;
      }),
    );
  });
};
