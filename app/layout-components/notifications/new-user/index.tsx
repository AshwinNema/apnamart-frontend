import {
  userRoleKeys,
  userRoles,
} from "@/app/layout-components/login-signup/constants";
import { useAppSelector } from "@/lib/main/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/main/slices/notification/notification.slice";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import Footer from "./footer";

export interface details {
  name: string;
  role: userRoleKeys;
  noInitialPassword?: boolean;
}

export const handleAction = (details: details) =>
  setNotificationType({
    type: notificationTypes.newUser,
    details,
    modalProps: {
      ...modalProps,
      className: `${modalProps.className} p-11`,
      placement: "top",
    },
  });

export default function NewUserNotification({
  onClose,
}: {
  onClose: () => void;
}) {
  const notifications = useAppSelector((state) => state.notifications);
  const details = notifications.details as details;
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <ModalHeader className="flex justify-center text-4xl">
        Hi {details?.name} 👋
      </ModalHeader>
      <ModalBody>
        <p>{userRoles?.[details?.role]?.userSignedUpText} </p>
        {user?.role === UserRole.merchant && (
          <p>
            Your registration is currently pending. Please complete the
            registration process to start creating your products. 🛍️✨
          </p>
        )}
      </ModalBody>
      <Footer onClose={onClose} />
    </>
  );
}
