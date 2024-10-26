import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  createUpdateProduct,
  createUpdateProductConfig,
  getDefaultCreateUpdateProductConfig,
  MainContext,
  MainCreateUpdateProductContext,
} from "../../helpers";
import { BackIcon } from "@/app/_custom-components";
import { getCategorySearchList } from "@/app/admin/products/helper";
import { setNestedPath } from "@/app/_utils";
import {
  Autocompletes,
  Description,
  ProductPriceNameRow,
  Specifications,
} from "./sub-components";
import { Button, Tooltip } from "@nextui-org/react";
import styles from "@/app/styles.module.css";

export const CreateUpdateProducts = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const mainState = useContext(MainContext);
  const [config, setConfig] = useState<createUpdateProductConfig>(
    getDefaultCreateUpdateProductConfig(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    getCategorySearchList(setData("categoryList"));
  }, []);
  if (!mainState) return null;
  return (
    <div className="m-2">
      <div className="font-bold flex justify-between mb-3">
        <div>
          <Tooltip content="Go back to main product screen" color="secondary">
            <Button
              onPress={() => {
                setNestedPath(mainState.setConfig)("currentState")(
                  "main screen",
                );
              }}
              isIconOnly
              className="bg-transparent"
            >
              <BackIcon />
            </Button>
          </Tooltip>
        </div>
        <div className="text-3xl ">Create Product</div>
        <div></div>
      </div>
      <MainCreateUpdateProductContext.Provider value={{ config, setConfig }}>
        <Autocompletes />
        <ProductPriceNameRow />
        <Specifications />
        <Description />
      </MainCreateUpdateProductContext.Provider>

      <div className="flex justify-end">
        <Button
          className={`${styles["hover-text-white"]}`}
          color="success"
          variant="ghost"
          onPress={() => {
            createUpdateProduct(config, onSuccess);
          }}
        >
          {config.id ? "Update " : "Create "} Product
        </Button>
      </div>
    </div>
  );
};
