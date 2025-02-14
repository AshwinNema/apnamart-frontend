"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  getDefaultMainConfig,
  getUserCartProducts,
  mainConfig,
  MainContext,
} from "./helpers";
import { setNestedPath } from "../_utils";
import styles from "@/app/styles.module.css";
import { Card } from "@heroui/react";
import {
  CartItem,
  EmptyCart,
  LoaderSkeleton,
  PlaceOrderCard,
  PriceDetailsCard,
} from "./sub-components";
import { produce } from "immer";

const Main = () => {
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const productLength = config.products.length;

  useEffect(() => {
    const handleResize = () => {
      setConfig(
        produce((draft) => {
          draft.innerWidth = window.innerWidth;
        }),
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getUserCartProducts(setData("products"), () => {
      setData("isCartLoaded")(true);
    });
  }, []);

  const showCartItems =
    !config.isCartLoaded || (config.isCartLoaded && !!productLength);

  return (
    <div className="mt-3">
      <MainContext.Provider
        value={{
          config,
          setConfig,
        }}
      >
        {showCartItems ? (
          <div className="mb-3">
            <div
              className={` ${config.innerWidth > 750 ? `${styles["user-card-grid"]} mx-[10svh] gap-5` : "mx-[2svh]"}`}
            >
              {!config.isCartLoaded ? (
                <LoaderSkeleton />
              ) : (
                <>
                  <Card radius="none">
                    {config.products.map((product, index) => {
                      return (
                        <Fragment key={product.details.id}>
                          <CartItem index={index} product={product} />
                        </Fragment>
                      );
                    })}
                  </Card>
                  <PriceDetailsCard />
                </>
              )}
            </div>
            {config.isCartLoaded && (
              <div
                className={`sticky bottom-0 z-[10] ${config.innerWidth <= 750 && "mx-[2svh]"}`}
              >
                <div
                  className={`${config.innerWidth > 750 && "mx-[10svh]"}  gap-5 ${config.innerWidth > 750 && styles["user-card-grid"]}`}
                >
                  <PlaceOrderCard />
                  <div></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyCart />
        )}
      </MainContext.Provider>
    </div>
  );
};

export default Main;
