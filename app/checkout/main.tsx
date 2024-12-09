"use client";

import { useCallback, useEffect, useState } from "react";
import { Modals, Address } from "./components";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import {
  getDefaultConfig,
  mainConfig,
  MainContext,
  setInitialAddress,
} from "./helpers";
import { produce } from "immer";
import { getUserCartProducts } from "../cart/helpers";
import { setNestedPath } from "../_utils";
import * as _ from "lodash";

const Main = () => {
  const cartCheckoutItems = useAppSelector((state) => state.cartCheckoutItems);
  const address = useAppSelector((state) => state?.user?.address);
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<mainConfig>(getDefaultConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    if (cartCheckoutItems.length) {
      setConfig(
        produce((draft) => {
          draft.cartItems = cartCheckoutItems;
        }),
      );
      return;
    }
    getUserCartProducts(setData("cartItems"));
  }, [cartCheckoutItems, dispatch]);

  useEffect(() => {
    setInitialAddress(setData("address"), address);
  }, [address]);

  return (
    <>
      <Modals />
      <MainContext.Provider value={{ config, setConfig }}>
        <div className="mx-[10svh] mt-5">
          <Address />
        </div>
      </MainContext.Provider>
    </>
  );
};

export default Main;
