import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";

export const verifyRazorpaypayment = (
  sessionId: number,
  details: {
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
  onSuccess?: () => void,
) => {
  makeDataRequest(
    HTTP_METHODS.POST,
    appEndPoints.VERIFY_RAZORPAY_PAYMENT + sessionId,
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
