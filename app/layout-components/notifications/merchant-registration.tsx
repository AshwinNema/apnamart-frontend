import { useAppSelector } from "@/lib/main/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/main/slices/notification/notification.slice";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { TiBusinessCard } from "react-icons/ti";
import { RiProfileLine } from "react-icons/ri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { commonRoleRoutes } from "@/app/_utils";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { useEffect, useState } from "react";
import { Spinner } from "@/app/_custom-components";
import {
  sessionStorageAttributes,
  setSessionStorageKey,
} from "@/app/_services";

export const handleAction = () =>
  setNotificationType({
    type: notificationTypes.merchantRegistration,
    details: null,
    modalProps: {
      ...modalProps,
    },
  });

const MerchantRegistration = ({ onClose }: { onClose: () => void }) => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();
  const selectedTab = useSearchParams().get("selectedTab");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(false);
    const isRegistrationPath =
      path == commonRoleRoutes.profile &&
      selectedTab === tabKeys.merchantRegistration;
    if (isRegistrationPath) {
      onClose();
    }
  }, [path, selectedTab]);

  return (
    <>
      <ModalHeader className="text-4l font-bold font-serif">
        <div className="flex justify-center gap-4 w-full items-center">
          <TiBusinessCard className="scale-[2]" />
          <div>Registration Pending</div>
        </div>
      </ModalHeader>

      <ModalBody>
        <p>🌟 Hi {user?.name}! 🌟</p>
        <p>
          Your registration is currently pending. Please complete the
          registration process to start creating your products. 🛍️✨
        </p>
        <p>Thank you! 😊</p>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-end">
          <Button
            onPress={() => {
              if (
                selectedTab !== tabKeys.merchantRegistration ||
                path !== commonRoleRoutes.profile
              ) {
                setShowSpinner(true);
                setSessionStorageKey(
                  sessionStorageAttributes.pendingMerchantRegistration,
                  true,
                );
                router.push(
                  `${commonRoleRoutes.profile}?selectedTab=${tabKeys.merchantRegistration}`,
                );
              }
            }}
            color="primary"
            startContent={<RiProfileLine />}
          >
            Complete Registration
          </Button>
        </div>
      </ModalFooter>
      {showSpinner && <Spinner />}
    </>
  );
};

export default MerchantRegistration;
