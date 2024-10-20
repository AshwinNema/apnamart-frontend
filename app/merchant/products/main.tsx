"use client";
import { useState } from "react";
import { mainConfig, MainContext } from "./helpers";
import { MainLandingPage, CreateUpdateProducts } from "./components";

const MerchantProductSection = () => {
  const [config, setConfig] = useState<mainConfig>({
    currentState: "main screen",
  });
  return (
    <div className="mt-5">
      <MainContext.Provider value={{ config, setConfig }}>
        <MainLandingPage />
        <CreateUpdateProducts />
      </MainContext.Provider>{" "}
    </div>
  );
};

export default MerchantProductSection;
