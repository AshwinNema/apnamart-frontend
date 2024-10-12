import React, { useCallback, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ThemeSwitch from "../theme-switch";
import LoginSignUpModal from "@/app/layout-components/login-signup";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { setNestedPath } from "@/app/_utils";
import { useAppSelector } from "@/lib/main/hooks";
import { FcShop } from "react-icons/fc";

import UserProfile from "../user-profile";

import { UserRoleMenu } from "../user-role-menu";
import { SpinnerLink } from "@/app/_custom-components";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector((state) => state.user);

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
      <Navbar
        isBordered
        classNames={{
          item: ["flex", "relative", "h-full", "items-center"],
          base: ["flex", "justify-between"],
          wrapper: ["max-w-full"],
        }}
      >
        <NavbarBrand className="flex items-center gap-4">
          {user ? <UserRoleMenu /> : null}

          <SpinnerLink color="foreground" href="/">
            <div className="flex gap-3 items-center">
              <FcShop className="scale-[2]" />
              <div className="font-bold font-serif">Apnamart</div>
            </div>
          </SpinnerLink>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          {!user ? (
            <>
              <NavbarItem>
                <Button
                  onPress={openModal(modalTypes.login)}
                  color="primary"
                  variant="faded"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button onPress={openModal(modalTypes.signUp)} color="primary">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : null}

          {!!user ? (
            <NavbarItem>
              <UserProfile />
            </NavbarItem>
          ) : null}
        </NavbarContent>
      </Navbar>
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setDataFunc("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
