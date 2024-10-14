import {
  HTTP_METHODS,
  makeDataRequest,
  token,
  clearUserStorage,
  getLocalStorageKey,
  storageAttributes,
  removeSessionStorageKey,
  sessionStorageAttributes,
} from "@/app/_services";
import { FcShop } from "react-icons/fc";
import { appEndPoints } from "@/app/_utils/endpoints";
import { useAppDispatch } from "@/lib/main/hooks";
import {
  modalProps,
  notificationTypes,
  setNotificationType,
} from "@/lib/main/slices/notification/notification.slice";
import { setUser } from "@/lib/main/slices/user/user.slice";
import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";

export const handleAction = () =>
  setNotificationType({
    type: notificationTypes.logout,
    details: null,
    modalProps: {
      ...modalProps,
      backdrop: "blur",
      hideCloseButton: true,
      isDismissable: false,
      className: `${modalProps.className}`,
    },
  });

export default function Logout({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    const tokens: token = getLocalStorageKey<token>(storageAttributes.tokens);
    const access = tokens?.access?.token || "";
    const refresh = tokens?.refresh?.token || "";

    makeDataRequest(
      HTTP_METHODS.POST,
      appEndPoints.LOG_OUT,
      { access, refresh },
      undefined,
      {
        addToken: false,
        showToastAndRedirect: false,
        showToast: false,
      },
    ).finally(() => {
      removeSessionStorageKey(
        sessionStorageAttributes.pendingMerchantRegistration,
      );
      clearUserStorage();
      dispatch(setUser(null));
      router.push("/");
      onClose();
    });
  };
  return (
    <>
      <ModalHeader className="text-4l font-bold font-serif flex flex-col">
        <div className="flex justify-center mb-3">
          <FcShop className="scale-[2]" />
        </div>
        <div className="flex justify-center">Logout of Apnamart?</div>
      </ModalHeader>
      <ModalBody>You can always log back in at any time.</ModalBody>
      <ModalFooter>
        <div className="flex flex-col w-full">
          <Button
            startContent={<TbLogout className="scale-[1.5]" />}
            onPress={logout}
            className="mb-3"
            color="warning"
            fullWidth={true}
          >
            Log out
          </Button>
          <Button
            variant="flat"
            color="danger"
            fullWidth={true}
            onPress={onClose}
          >
            Cancel
          </Button>
        </div>
      </ModalFooter>
    </>
  );
}
