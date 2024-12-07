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
import { Card } from "@nextui-org/react";
import {
  CartItem,
  EmptyCart,
  LoaderSkeleton,
  PlaceOrderCard,
  PriceDetailsCard,
} from "./sub-components";

const Main = () => {
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const productLength = config.products.length;

  useEffect(() => {
    getUserCartProducts(setData("products"), () => {
      setData("isCartLoaded")(true);
    });
  }, []);

  const showCartItems =
    !config.isCartLoaded || (config.isCartLoaded && !!productLength);

  return (
    <MainContext.Provider
      value={{
        config,
        setConfig,
      }}
    >
      {showCartItems ? (
        <div className="mb-3">
          <div className={`mx-[10svh] gap-5 ${styles["user-card-grid"]}`}>
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
            <div className="sticky top-[64px] bottom-0 z-[10]">
              <div className={`mx-[10svh] gap-5 ${styles["user-card-grid"]}`}>
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
  );
};

export default Main;
