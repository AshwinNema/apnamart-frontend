import {
  auth,
  user,
  category,
  subcategory,
  items,
  merchant,
  product,
  customer,
  deliveryArea,
} from "./sub-endpoints";

export const appEndPoints = {
  ...auth,
  ...user,
  ...deliveryArea,
  ...category,
  ...subcategory,
  ...items,
  ...merchant,
  ...product,
  ...customer,
};

const webSocketService = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`;

export const webSocketEndPoints = {
  CHAT: `${webSocketService}chat`,
};

export enum socketEvents {
  initiateMerchantAdminChat = "initiate-merchant-admin-chat",
  sendMerchantAdminChatMsg = "merchant-admin-chat-msg",
  error = "error",
  queryChatsMsgs = "query-merchant-admin-chat-msgs",
  messagesDelivered = "merchant-admin-chat-msgs-delivered",
  markMsgAsRead = "merchant-admin-chat-mark-msg-read",
  reinitiateMerchantAdminChat = "reinitiate-merchant-admin-chat",
}
