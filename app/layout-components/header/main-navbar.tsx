import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import ThemeSwitch from "../theme-switch";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { useAppSelector } from "@/lib/main/hooks";
import { FcShop } from "react-icons/fc";
import UserProfile from "../user-profile";
import { UserRoleMenu } from "../user-role-menu";
import { SpinnerLink } from "@/app/_custom-components";
import { UserShoppingCart } from "./user-shopping-cart";

export const MainNavBar = ({
  openModal,
}: {
  openModal: (modalType: modalTypes) => () => void;
}) => {
  const user = useAppSelector((state) => state.user);
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
            <>
              <UserShoppingCart />
              <NavbarItem>
                <UserProfile />
              </NavbarItem>
            </>
          ) : null}
        </NavbarContent>
      </Navbar>
    </>
  );
};
