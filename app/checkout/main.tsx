"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modals, Address, OrderSummary, PaymentOptions } from "./components";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import {
  componentNotifier,
  createCheckoutSession,
  getDefaultConfig,
  mainConfig,
  MainContext,
} from "./helpers";
import { setNestedPath } from "../_utils";
import * as _ from "lodash";
import { ComponentSkeleton } from "../_custom-components";
import { setCartCheckoutItems } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { OtherPaymentOptions } from "./components/payment-options/other-payment-options";
import { Subject } from "rxjs";

const Main = () => {
  const hasMounted = useRef(false);
  const cartCheckoutItems = useAppSelector((state) => state.cartCheckoutItems);
  const notifier = useMemo(() => new Subject<componentNotifier>(), []);
  const dispatch = useAppDispatch();
  const [config, setConfig] = useState<mainConfig>(getDefaultConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    createCheckoutSession(cartCheckoutItems, setConfig, () => {
      setData("areCartItemsLoaded")(true), dispatch(setCartCheckoutItems([]));
    });
  }, [cartCheckoutItems, dispatch]);

  return (
    <>
      <Modals />
      {!config.areCartItemsLoaded ? (
        <ComponentSkeleton />
      ) : (
        <MainContext.Provider value={{ config, setConfig, notifier }}>
          <div className="mn625:mx-[10svh] mt-5">
            <Address />
            <OrderSummary />
            <PaymentOptions />
            <OtherPaymentOptions />
          </div>
        </MainContext.Provider>
      )}
    </>
  );
};

export default Main;
