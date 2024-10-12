import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import {
  notificationTypes,
  resetNotifications,
} from "@/lib/main/slices/notification/notification.slice";
import styles from "../../styles.module.css";
import dynamic from "next/dynamic";

export default function NotificationModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { type, modalProps } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const Logout = dynamic(() => import("./logout"));
  const NewUserNotification = dynamic(() => import("./new-user"));
  const MerchantRegistration = dynamic(() => import("./merchant-registration"));
  const resetReduxState = () => dispatch(resetNotifications());

  useEffect(() => {
    if (!type) return;
    onOpen();
  }, [type]);

  useEffect(() => {
    !isOpen && resetReduxState();
  }, [isOpen]);

  const CurrentNotificationModal = () => {
    switch (type) {
      case notificationTypes.newUser:
        return <NewUserNotification onClose={onClose} />;

      case notificationTypes.logout:
        return <Logout onClose={onClose} />;

      case notificationTypes.merchantRegistration:
        return <MerchantRegistration onClose={onClose} />;

      default:
        return null;
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      className={`${modalProps?.className}`}
      classNames={{
        wrapper: `${modalProps.backdrop === "blur" && styles.blurBackdrop}`,
      }}
      backdrop={`${modalProps?.backdrop}`}
      scrollBehavior={`${modalProps?.scrollBehavior}`}
      placement={`${modalProps?.placement}`}
      hideCloseButton={modalProps.hideCloseButton}
      isDismissable={modalProps.isDismissable}
      onOpenChange={() => {
        onOpenChange();
      }}
    >
      <ModalContent>{() => <CurrentNotificationModal />}</ModalContent>
    </Modal>
  );
}
