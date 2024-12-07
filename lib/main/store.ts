import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { userSlice } from "./slices/user/user.slice";
import { notificationsSlice } from "./slices/notification/notification.slice";
import { productMenuSlice } from "./slices/product-menu/product-menu.slice";
import { cartCountSlice } from "./slices/cart-count/cart-count.slice";
import { cartCheckoutItemSlice } from "./slices/checkout-items/checkout-items.slice";

const rootReducer = combineSlices(
  userSlice,
  notificationsSlice,
  productMenuSlice,
  cartCountSlice,
  cartCheckoutItemSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
