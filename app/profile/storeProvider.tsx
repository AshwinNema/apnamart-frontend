import { makeStore, ProfileStore } from "@/lib/profile/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<ProfileStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      return setupListeners(storeRef.current.dispatch);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
