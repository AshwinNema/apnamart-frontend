"use client";
import { useState } from "react";
import { mainConfig, MainContext } from "./helpers";
import { MainLandingPage, CreateUpdateProducts } from "./components";

const MerchantProductSection = () => {
  const [config, setConfig] = useState<mainConfig>({
    currentState: "main screen",
  });

  const isCreatingUpdatingProduct =
    config.currentState === "create" || config.currentState === "update";
  return (
    <div className="mt-5">
      <MainContext.Provider value={{ config, setConfig }}>
        {isCreatingUpdatingProduct ? (
          <CreateUpdateProducts />
        ) : (
          <MainLandingPage />
        )}
      </MainContext.Provider>{" "}
    </div>
  );
};

export default MerchantProductSection;
