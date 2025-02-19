import { useAppSelector } from "@/lib/main/hooks";
import { useEffect, useState } from "react";
import { modalConfig, modalTypes } from "../../helpers";
import { produce } from "immer";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import { AddressModal, EmptyCartModel } from "./sub-components";
import {
  EventLoader,
  Spinner,
  useEventLoaderEmitter,
} from "@/app/_custom-components";

export const Modals = () => {
  const user = useAppSelector((state) => state.user);
  const emitter = useEventLoaderEmitter();
  const checkoutItems = useAppSelector((state) => state.cartCheckoutItems);
  const isCartCountFetched = useAppSelector(
    (state) => state.cartCount.isFetched,
  );
  const cartCount = useAppSelector((state) => state.cartCount.count);
  const [config, setConfig] = useState<modalConfig>({
    type: null,
    isDismissable: true,
    hideCloseButton: false,
  });

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const addressNotSet = user && !user?.address;
    if (addressNotSet) {
      setConfig(
        produce((draft) => {
          draft.type = modalTypes.noAddress;
          draft.isDismissable = false;
          draft.hideCloseButton = true;
        }),
      );
      onOpen();
      return;
    }

    if (!isCartCountFetched) return;
    const isEmptyCheckout = !cartCount && !checkoutItems.length;
    if (isEmptyCheckout) {
      setConfig(
        produce((draft) => {
          draft.type = modalTypes.emptyCart;
          draft.isDismissable = false;
          draft.hideCloseButton = true;
        }),
      );
      onOpen();
      return;
    }
  }, [user?.address, checkoutItems, cartCount, isCartCountFetched]);

  return (
    <>
      {!isCartCountFetched && <Spinner />}
      <Modal
        isDismissable={config.isDismissable}
        hideCloseButton={config.hideCloseButton}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {() => {
            return (
              <>
                {config.type === modalTypes.noAddress && (
                  <AddressModal emitter={emitter} />
                )}
                {config.type === modalTypes.emptyCart && (
                  <EmptyCartModel emitter={emitter} />
                )}
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <EventLoader emitter={emitter} />
    </>
  );
};
