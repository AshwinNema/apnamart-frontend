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
import { Skeleton } from "@heroui/react";

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
      () => {
        setData("isLoaded")(true);
      },
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
    <Skeleton isLoaded={config.isLoaded} className="h-[100svh]">
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
    </Skeleton>
  );
};

export default MerchantProductSection;
