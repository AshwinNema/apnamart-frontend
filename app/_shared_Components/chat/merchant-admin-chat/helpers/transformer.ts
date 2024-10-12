import {
  messageBoxStatusTypes,
  messagesState,
  messageSenderType,
} from "@/app/_custom-components/chatbox";
import { getLocalStorageKey, storageAttributes } from "@/app/_services";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";

export interface chatMsg {
  id: number;
  message: string;
  sentTime: Date;
  senderId: number;
  receiverId: number | null;
  status: messageBoxStatusTypes;
  deliveryTime?: Date;
  readTime?: Date;
}

export const transformChatMsgs = (
  msgs?: chatMsg[],
  merchantId?: number,
): messagesState["messages"] => {
  if (!msgs) return [];
  return msgs.map((msg) => {
    const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    const role = user?.role;
    //   // A user is the sender of the message when
    //   // 1. User has sent the message
    //   // 2. if admin is logged in, then we can say that current user is the sender, provided we have merchantId, we compare merchantId with senderId.If they are not equal it means that current user is the sender
    let isSender = msg.senderId === user?.id;
    const isDifferentUser = merchantId && user?.id !== merchantId;
    if (isDifferentUser) {
      isSender = msg.senderId !== merchantId;
    }
    return {
      senderType: isSender
        ? messageSenderType.client
        : messageSenderType.response,
      timestamp: new Date(msg.sentTime),
      status: msg.status,
      id: msg.id,
      text: msg.message,
      readTime: msg.readTime,
      deliveryTime: msg.deliveryTime,
    };
  });
};
