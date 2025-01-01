import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";

export const verifyRazorpaypayment = (
  details: {
    razorpay_payment_id: string;
    razorpay_signature: string;
    razorpay_order_id: string;
  },
  onSuccess?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.POST,
    appEndPoints.VERIFY_RAZORPAY_PAYMENT,
    details,
  )
    .then((res) => {
      if (!res) return;
      onSuccess && onSuccess();
    })
    .catch((err) => {
      console.log(err);
    });
};
