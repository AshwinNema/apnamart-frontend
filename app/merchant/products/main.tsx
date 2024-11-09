"use client";
import { useCallback, useEffect, useState } from "react";
import {
  getDefaultMainConfig,
  mainConfig,
  MainContext,
  queryProducts,
} from "./helpers";
import { MainLandingPage, CreateUpdateProducts } from "./components";
import { setNestedPath } from "@/app/_utils";

const MerchantProductSection = () => {
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const queryData = useCallback((page: number) => {
    queryProducts(
      {
        limit: config.limit,
        page,
      },
      setConfig,
    );
  }, []);

  useEffect(() => {
    queryData(1);
  }, []);

  useEffect(() => {
    config.currentState === "main screen" && setData("updateData")(null);
  }, [config.currentState]);

  const isCreatingUpdatingProduct =
    config.currentState === "create" || config.currentState === "update";
  return (
    <div className="mt-5">
      <MainContext.Provider value={{ config, setConfig }}>
        {isCreatingUpdatingProduct ? (
          <CreateUpdateProducts
            updateData={config.updateData}
            onSuccess={() => {
              setData("currentState")("main screen");
              queryData(config.page);
            }}
          />
        ) : (
          <MainLandingPage
            queryCurData={(page) => {
              queryData(page ? page : config.page);
            }}
          />
        )}
      </MainContext.Provider>{" "}
    </div>
  );
};

export default MerchantProductSection;
