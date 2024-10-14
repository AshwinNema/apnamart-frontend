import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { usePathname, useRouter } from "next/navigation";
import { handleAction } from "./notifications/logout";
import { commonRoleRoutes, setNestedPath } from "../_utils";
import { Spinner } from "../_custom-components";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";

export default function UserProfile() {
  const user = useAppSelector((state) => state.user);
  const [config, setConfig] = useState({ showSpinner: false });
  const path = usePathname();
  const setData = setNestedPath(setConfig);

  useEffect(() => {
    setData("showSpinner")(false);
  }, [path]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  enum dropDownItemKeys {
    signIn = "Signed as",
    updateProfile = "Update Profile",
    logout = "Logout",
  }

  const optionSelect = (key: string | number) => {
    switch (key) {
      case dropDownItemKeys.updateProfile:
        if (!path.startsWith(commonRoleRoutes.profile)) {
          setData("showSpinner")(true);
        }
        router.push(commonRoleRoutes.profile);
        break;
      case dropDownItemKeys.logout:
        dispatch(handleAction());
        break;
      default:
        break;
    }
  };

  const description = `@${user?.email?.split?.("@")[0]}`;
  return (
    <>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              //   src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={description}
            name={`${user.name}`}
          />
        </DropdownTrigger>
        <DropdownMenu
          onAction={optionSelect}
          aria-label="User Actions"
          variant="flat"
        >
          <DropdownItem
            key="profile"
            className="h-14 gap-2 pointer-events-none"
          >
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{description}</p>
          </DropdownItem>
          <DropdownItem
            startContent={<ImProfile className="scale-[1.5]" />}
            key={dropDownItemKeys.updateProfile}
            description="Update your profile details"
          >
            Profile
          </DropdownItem>
          <DropdownItem
            startContent={<IoIosLogOut className="scale-[1.5]" />}
            description="Logout of the platform"
            key={dropDownItemKeys.logout}
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {config.showSpinner && <Spinner />}
    </>
  );
}
