import { errorToast } from "@/app/_utils";
import { Button } from "@heroui/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
export const StripeCheckout = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentBtnClick = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      errorToast({
        msg: error.message,
      });
    } else {
      errorToast({
        msg: "An unexpected error occurred",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <PaymentElement
        options={{
          layout: "accordion",
        }}
      />
      <Button
        color="primary"
        onPress={handlePaymentBtnClick}
        isDisabled={isLoading || !stripe || !elements}
        isLoading={isLoading}
      >
        {!isLoading && "Pay Now"}
      </Button>
      <Button onPress={onClose} color="danger">
        Cancel
      </Button>
    </>
  );
};
