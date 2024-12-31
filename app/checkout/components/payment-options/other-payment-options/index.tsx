import { useContext, useEffect } from "react";
import { MainContext, paymentOptions } from "../../../helpers";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckout } from "./stripe-checkout";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY}`,
);

export const OtherPaymentOptions = () => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const context = useContext(MainContext);
  const paymentMode = context?.config?.paymentMode;
  const notifier = context?.notifier;
  const stripeClientSecret = context?.config?.stripeClientSecret;
  const { theme } = useTheme();
  useEffect(() => {
    if (!notifier) return;
    const subscription = notifier.subscribe((details) => {
      switch (details.type) {
        case "payment mode change":
          details.details === paymentOptions.stripe && onOpen();
          break;

        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [notifier]);

  if (!context) return null;

  return (
    <>
      <Modal
        backdrop="blur"
        classNames={{
          base: "bg-transparent shadow-none",
        }}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          <>
            <ModalBody>
              {stripeClientSecret && paymentMode === paymentOptions.stripe && (
                <Elements
                  options={{
                    clientSecret: stripeClientSecret,
                    appearance: {
                      theme: theme === browserTheme.dark ? "night" : "stripe",
                    },
                    loader: "auto",
                  }}
                  stripe={stripePromise}
                >
                  <StripeCheckout onClose={onClose} />
                </Elements>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
