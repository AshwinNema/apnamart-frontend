import {
  getLocalStorageKey,
  HTTP_METHODS,
  makeDataRequest,
  storageAttributes,
} from "@/app/_services";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import Heart from "react-animated-heart";
import LoginSignUpModal from "@/app/layout-components/login-signup";
import { appEndPoints, errorToast, setNestedPath } from "@/app/_utils";

export const ProductLikedHeart = ({
  styles,
  isClicked,
  setIsClicked,
  productId,
}: {
  styles: React.CSSProperties;
  isClicked: boolean;
  setIsClicked: (val: boolean) => void;
  productId: number;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState<{
    modalType: null | modalTypes;
  }>({
    modalType: modalTypes.login,
  });

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    !isOpen && setData("modalType")(modalTypes.login);
  }, [isOpen]);

  return (
    <>
      <Heart
        isClick={isClicked}
        styles={styles}
        onClick={() => {
          const user = getLocalStorageKey(storageAttributes.user);
          const clickState = isClicked;
          if (!user) {
            onOpen();
            return;
          }
          setIsClicked(!clickState);

          makeDataRequest(
            HTTP_METHODS.PUT,
            `${appEndPoints.ADD_REMOVE_WISHLIST_ITEM}${productId}`,
            undefined,
            {
              connect: !clickState,
            },
            {
              showLoader: false,
            },
          )
            .then((res) => {
              if (!res) {
                setIsClicked(clickState);
                return;
              }
            })
            .catch((err) => {
              errorToast({ msg: err.msg });
              setIsClicked(clickState);
            });
        }}
      />
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setData("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
