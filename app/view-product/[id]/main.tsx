"use client";
import { useAppSelector } from "@/lib/main/hooks";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProductData,
  mainConfig,
  MainContext,
  notifier,
  getDefaultMainConfig,
} from "./helpers";
import styles from "@/app/styles.module.css";
import { ProductImages } from "./components/product-images";
import { setNestedPath } from "@/app/_utils";
import { MagnifiedImg } from "./components/product-images/product-img/magnified-img";
import { Subject } from "rxjs";

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
          </div>
          <div className="relative">
            <MagnifiedImg />
          </div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default MainComponent;
