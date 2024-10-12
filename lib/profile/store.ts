import {
  Action,
  combineSlices,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { mainUserDetailsSlice } from "./slices/main-user-details.slice";
import { userSlice } from "./slices/user.slice";
import { addressDetailsSlice } from "./slices/address-slice";
import { componentDetailsSlice } from "./slices/component-state.slice";
import { merchantDetailsSlice } from "./slices/merchant-details.slice";

const rootReducer = combineSlices(
  userSlice,
  mainUserDetailsSlice,
  addressDetailsSlice,
  componentDetailsSlice,
  merchantDetailsSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type ProfileStore = ReturnType<typeof makeStore>;

export type ProfileDispatch = ProfileStore["dispatch"];

export type ProductThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
