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

const MainComponent = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const notifier = useMemo(() => new Subject<notifier>(), []);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    const productId = Number(id);
    if (!productId) {
      router.push("/");
      return;
    }
    getProductData(productId, setData("details"));
  }, [id, user]);

  return (
    <>
      <MainContext.Provider value={{ config, setConfig, notifier }}>
        <div className={`${styles["product-item-container"]}`}>
          <div>
            <ProductImages />
            <ProductBtns />
          </div>
          <div className="relative">
            <ProductDetails />
            <MagnifiedImg />
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default MainComponent;
