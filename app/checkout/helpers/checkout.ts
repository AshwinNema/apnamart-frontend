import { UserInterface } from "@/lib/main/slices/user/user.slice";
import {
  changePaymentMode,
  MainContextType,
  paymentOptions,
  verifyRazorpaypayment,
} from ".";
import { produce } from "immer";
import * as _ from "lodash";

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
        if (res.razorpayPaymentId) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_ID,
            amount: res.totalPrice * 100,
            currency: "INR",
            name: "Apnamart",
            order_id: res.razorpayPaymentId,
            prefill: {
              name: user.name,
              email: user.email,
            },
            handler: (response: {
              razorpay_payment_id: string;
              razorpay_order_id: string;
              razorpay_signature: string;
            }) => {
              verifyRazorpaypayment(
                context.config.checkoutId as number,
                _.pick(response, ["razorpay_signature", "razorpay_payment_id"]),
                onPaymentSuccess,
              );
            },
          };
          const razorPay = new window.Razorpay(options);
          razorPay.open();
        }
        break;

      default:
        break;
    }
    console.log(res, "this is the res");
    context.setConfig(
      produce((draft) => {
        draft.paymentMode = paymentType;
      }),
    );
  });
};
