"use client";
import { useAppSelector } from "@/lib/main/hooks";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getProductData,
  mainConfig,
  MainContext,
  notifier,
  getDefaultMainConfig,
} from "./helpers";
import { ProductImages } from "./components/product-images";
import { setNestedPath } from "@/app/_utils";
import { MagnifiedImg } from "./components/product-images/product-img/magnified-img";
import { Subject } from "rxjs";
import { ProductDetails } from "./components/product-details";
import styles from "./styles.module.css";
import { ProductBtns } from "./components/product-btns";
import { Skeleton } from "@heroui/react";
import { produce } from "immer";

const MainComponent = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const notifier = useMemo(() => new Subject<notifier>(), []);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

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
    const productId = Number(id);
    if (!productId) {
      router.push("/");
      return;
    }
    getProductData(
      productId,
      setData("details"),
      () => {
        setData("isDataLoaded")(true);
      },
      () => {
        router.push("/");
      },
    );
  }, [id, user]);

  return (
    <>
      <Skeleton
        className={`${!config.isDataLoaded && "h-svh"}`}
        isLoaded={config.isDataLoaded}
      >
        <MainContext.Provider value={{ config, setConfig, notifier }}>
          <div className={`${styles["product-item-container"]}`}>
            <div>
              <ProductImages />
              {config.innerWidth > 800 && <ProductBtns />}
            </div>
            <div className="relative">
              <ProductDetails />
              {config.innerWidth > 800 && <MagnifiedImg />}
            </div>

            {config.innerWidth <= 800 && (
              <div className="sticky bottom-0 z-[10] bg-white p-3 border-styledBorder border-t-[0.1rem]">
                <ProductBtns />{" "}
              </div>
            )}
          </div>
        </MainContext.Provider>
      </Skeleton>
    </>
  );
};

export default MainComponent;
