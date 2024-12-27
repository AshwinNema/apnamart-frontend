"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Modals, Address, OrderSummary, PaymentOptions } from "./components";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import {
  createCheckoutSession,
  endCheckoutSession,
  getDefaultConfig,
  mainConfig,
  MainContext,
} from "./helpers";
import { setNestedPath } from "../_utils";
import * as _ from "lodash";
import { ComponentSkeleton } from "../_custom-components";
import { setCartCheckoutItems } from "@/lib/main/slices/checkout-items/checkout-items.slice";

const Main = () => {
  const mountingState = useRef(0);
  const cartCheckoutItems = useAppSelector((state) => state.cartCheckoutItems);
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<mainConfig>(getDefaultConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    if (mountingState.current) return;
    mountingState.current += 1;
    createCheckoutSession(cartCheckoutItems, setConfig, () => {
      setData("areCartItemsLoaded")(true), dispatch(setCartCheckoutItems([]));
    });
  }, [cartCheckoutItems, dispatch]);

  useEffect(() => {
    return () => {
      const value = mountingState.current;
      const sessionEnded = value === 2 && config.checkoutId;
      if (value == 1) {
        mountingState.current += 1;
      }
      sessionEnded && endCheckoutSession(config.checkoutId as number);
    };
  }, [config.checkoutId]);
  return (
    <>
      <Modals />
      {!config.areCartItemsLoaded ? (
        <ComponentSkeleton />
      ) : (
        <MainContext.Provider value={{ config, setConfig }}>
          <div className="mx-[10svh] mt-5">
            <Address />
            <OrderSummary />
            <PaymentOptions />
          </div>
        </MainContext.Provider>
      )}
    </>
  );
};

export default Main;
