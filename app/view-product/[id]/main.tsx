"use client";
import { useAppSelector } from "@/lib/main/hooks";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductData, mainConfig, MainContext } from "./helpers";
import { queriedProduct } from "@/app/merchant/products/helpers";
import styles from "@/app/styles.module.css";
import { ProductImages } from "./components/product-images";
import { setNestedPath } from "@/app/_utils";

const MainComponent = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [config, setConfig] = useState<mainConfig>({
    details: null,
  });
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
      <MainContext.Provider value={{ config, setConfig }}>
        <div className={`${styles["product-item-container"]}`}>
          <div>
            <ProductImages />
          </div>
          <div>sdffd</div>
        </div>
      </MainContext.Provider>
    </>
  );
};

export default MainComponent;
