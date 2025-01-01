export const backendService = `${process.env.NEXT_PUBLIC_BACKEND_URL}v2/`;

export * from "./item-entities";

export const auth = {
  LOGIN: `${backendService}auth/login`,
  REGISTER: `${backendService}auth/register`,
  REFRESH_TOKEN: `${backendService}auth/refresh-token`,
  GOOGLE_LOGIN: `${backendService}auth/google`,
  TWITTER_ACCESS_TOKEN: `${backendService}auth/twitter/access-token`,
  TWITTER_REQUEST_TOKEN: `${backendService}auth/twitter/request-token`,
  LOG_OUT: `${backendService}auth/logout`,
};

export const user = {
  UPLOAD_PROFILE_IMG: `${backendService}user/profile-photo`,
  PROFILE: `${backendService}user/profile`,
  QUERY_MAP_LOCATION: `${backendService}user/query-location`,
  GET_ADDRESS: `${backendService}user/address`,
  UPDATE_USER_ADDRESS: `${backendService}user/address`,
  UPDATE_USER_PROFILE: `${backendService}user/profile`,
};

export const merchant = {
  START_MERCHANT_REGISTRATION: `${backendService}merchant/registration`,
  MERCHANT_REGISTRATION_FILE: `${backendService}merchant/registration/image`,
  UPDATE_REGISTRATION_DETAILS: `${backendService}merchant/registration`,
  QUERY_MERCHANT_REGISTRATIONS: `${backendService}merchant/registration`,
  APPROVE_MERCHANT_REGISTRATION: `${backendService}merchant/registration/approve/`,
  QUERY_MERCHANTS: `${backendService}merchant`,
  BLOCK_UNBLOCK_MERCHANT: `${backendService}merchant/block-unblock`,
};

export const customer = {
  CUSTOMER_MENU: `${backendService}customer/category-subcategory-item-menu`,
  ADD_REMOVE_WISHLIST_ITEM: `${backendService}customer/add-remove-wishlist-item/`,
  ADD_REMOVE_CART_ITEM: `${backendService}customer/add-remove-cart-item/`,
  CART_ITEM_COUNT: `${backendService}customer/cart-item-count`,
  CART_ITEM_LIST: `${backendService}customer/cart-item-list`,
  INCREASE_DECREASE_CART_ITEM_COUNT: `${backendService}customer/increase-decrease-cart-item-count/`,
};

export const deliveryArea = {
  UPDATE_DELIVERY_AREA: `${backendService}delivery-area`,
  GET_ALL_DELIVERY_AREAS: `${backendService}delivery-area`,
  CHECK_IS_AREA_DELIVERABLE: `${backendService}delivery-area/is-area-deliverable`,
};

export const checkout = {
  CREATE_CHECKOUT_SESSION: `${backendService}checkout`,
  UPDATE_CHECKOUT_DELIVERY_ADDRESS: `${backendService}checkout/address/`,
  CHANGE_CHECKOUT_ITEM_QUANTITY: `${backendService}checkout/quantity-change/`,
  REMOVE_CHECKOUT_ITEM: `${backendService}checkout/delete-item/`,
  CHANGE_CHECKOUT_PAYMENT_MODE: `${backendService}checkout/change-paymentMode/`,
  VERIFY_RAZORPAY_PAYMENT: `${backendService}checkout/payment/verify-razorpay-signature`,
  PLACE_ORDER: `${backendService}checkout/place-order/`,
};
