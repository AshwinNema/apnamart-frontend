import {
  getLocalStorageKey,
  storageAttributes,
} from "@/app/_services/web-storage.service";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState:
    getLocalStorageKey<UserInterface>(storageAttributes.user) || null,
  reducers: {
    setProfileUser(_, action) {
      return action.payload;
    },
  },
});

export const { setProfileUser } = userSlice.actions;
