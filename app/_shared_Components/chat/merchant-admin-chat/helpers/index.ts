import { getLocalStorageKey, storageAttributes } from "@/app/_services";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { v4 } from "uuid";
import {
  messageBoxStatusTypes,
  messageSenderType,
} from "@/app/_custom-components/chatbox";
export * from "./socket";
export * from "./transformer";

export const getInitialMsgs = () => {
  const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
  const role = user?.role;

  return role === UserRole.merchant
    ? [
        {
          senderType: messageSenderType.response,
          timestamp: new Date(),
          status: messageBoxStatusTypes.read,
          id: v4(),
          hideStatusAndTime: true,
          text: `👋 Hello! Welcome to Apnamart! We're here to help you with anything you need. If you have questions about our platform, your profile status, or anything else, just ask! 😊
  How can we assist you today?`,
        },
      ]
    : [];
};
