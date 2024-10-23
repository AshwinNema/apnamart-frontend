import { ReactNode } from "react";
import { NewMerchantRegistration } from "../../components";
import { MerchantList } from "../../components/merchant-list";

export enum tabKeys {
  newRegistration = "New Merchant Registrations",
  blockedMerchants = "Blocked Merchants",
  merchantList = "Merchant List",
}

export interface tabOption {
  Content: () => ReactNode;
  key: tabKeys;
}

export const tabList: tabOption[] = [
  {
    key: tabKeys.newRegistration,
    Content: () => <NewMerchantRegistration />,
  },
  {
    key: tabKeys.merchantList,
    Content: () => <MerchantList />,
  },
];
