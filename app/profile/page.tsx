"use client";

import { ComponentSkeleton, ProtectedRoute } from "../_custom-components";
import dynamic from "next/dynamic";
import { StoreProvider } from "./storeProvider";
import { useAppDispatch } from "@/lib/main/hooks";
import { useEffect } from "react";
import { getUserProfile } from "./api";
import { createContext } from "react";
import {
  setUser,
  UserInterface,
  UserRole,
} from "@/lib/main/slices/user/user.slice";
import { getLocalStorageKey, storageAttributes } from "../_services";

export const MainProfileContext = createContext<
  null | ((user: UserInterface) => void)
>(null);

export default function UserProfile() {
  const UserProfile = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
    ssr: false,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user: UserInterface = getLocalStorageKey(storageAttributes.user);
    getUserProfile(dispatch, user?.role === UserRole.merchant);
  }, [dispatch]);

  const updateUserData = (user: UserInterface) => {
    dispatch(setUser(user));
  };

  return (
    <ProtectedRoute>
      <StoreProvider>
        <MainProfileContext.Provider value={updateUserData}>
          <UserProfile />
        </MainProfileContext.Provider>
      </StoreProvider>
    </ProtectedRoute>
  );
}
