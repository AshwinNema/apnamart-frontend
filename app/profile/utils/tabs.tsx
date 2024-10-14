import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiListSettingsLine } from "react-icons/ri";
import BasicDetails from "../user-input-details";
import { tabOption } from ".";
import dynamic from "next/dynamic";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { ComponentSkeleton } from "@/app/_custom-components";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import MerchantRegistration from "../merchant-registration";

export const getTabOptions = (user: UserInterface): tabOption[] => {
  const role = user?.role;
  const config: tabOption[] = [
    {
      title: (
        <div className="flex items-center gap-4">
          <CgProfile className="scale-[2]" />
          Profile
        </div>
      ),
      Content: () => <BasicDetails />,
      key: tabKeys.basicDetails,
    },
  ];

  role === UserRole.customer &&
    config.push({
      title: (
        <div className="flex items-center gap-4">
          <FaMapLocationDot className="scale-[2]" />
          Address
        </div>
      ),
      Content: () => {
        const UserAddress = dynamic(
          () => import("@/app/profile/address/index"),
          {
            ssr: false,
            loading: () => <ComponentSkeleton />,
          },
        );
        return <UserAddress />;
      },
      key: tabKeys.address,
    });
  // Please change name to business profile when registration is complete
  role === UserRole.merchant &&
    config.push({
      title: (
        <div className="flex items-center gap-4">
          <LiaBusinessTimeSolid className="scale-[2]" />
          Business {user?.merchantDetails?.id ? "Profile" : "Registration"}
        </div>
      ),
      Content: () => <MerchantRegistration />,
      key: tabKeys.merchantRegistration,
    });

  config.push({
    title: (
      <div className="flex items-center gap-4">
        <RiListSettingsLine className="scale-[2]" />
        Settings
      </div>
    ),
    Content: () => <BasicDetails />,
    key: tabKeys.settings,
  });
  return config;
};
