import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { EventLoader } from "../../_custom-components";
import { ImProfile } from "react-icons/im";
import { IoIosLogOut } from "react-icons/io";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import useDataManager, { dropDownItemKeys } from "./useDataManager";

export default function UserProfile() {
  const [user, optionSelect, emitter] = useDataManager();
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

          {user?.role === UserRole.customer ? (
            <DropdownItem
              key={dropDownItemKeys.orders}
              startContent={<FaFirstOrderAlt className="scale-[1.5]" />}
              description="View your orders"
            >
              Orders
            </DropdownItem>
          ) : (
            <></>
          )}
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
      <EventLoader emitter={emitter} />
    </>
  );
}
