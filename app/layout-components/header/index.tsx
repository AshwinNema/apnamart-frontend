import React, { useCallback, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import LoginSignUpModal from "@/app/layout-components/login-signup";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { setNestedPath } from "@/app/_utils";
import { MainNavBar } from "./main-navbar";
import { CustomerMenu } from "./customer-menu";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState({
    modalType: null,
  });

  const setDataFunc = useCallback(setNestedPath(setConfig), [setConfig]);

  const openModal = (modalType: modalTypes) => () => {
    setDataFunc("modalType")(modalType);
    onOpen();
  };

  return (
    <>
      <MainNavBar openModal={openModal} />
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setDataFunc("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <CustomerMenu />
    </>
  );
}
