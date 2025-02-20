import {
  createUpdateProductConfig,
  MainCreateUpdateProductContext,
  specificationOptions,
} from "@/app/merchant/products/helpers";
import { Select, SelectItem } from "@heroui/react";
import { useContext } from "react";
import { produce } from "immer";
import { SpecificationDetails } from "./specification-details";
import styles from "@/app/styles.module.css";
export const Specifications = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center">
        <div className="font-bold">Specifications</div>
        {config.innerWidth <= 500 && <SpecificationDetails />}
      </div>
      <div
        className={`mb-3 font-bold items-center gap-3 ${styles["product-specification-description-grid"]}`}
      >
        {" "}
        <div className="mx500:w-full">
          <Select
            label="Select specification type"
            selectedKeys={[config.specificationType]}
            onChange={(e) => {
              setConfig(
                produce((draft) => {
                  const specificationType = e.target
                    .value as createUpdateProductConfig["specificationType"];
                  draft.specificationType = specificationType;
                  if (specificationType === "string") {
                    draft.specifications = "";
                  }
                  if (specificationType === "series") draft.specifications = [];
                }),
              );
            }}
          >
            {specificationOptions.map((selectedOption) => (
              <SelectItem key={selectedOption.key}>
                {selectedOption.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        {config.innerWidth > 500 && <SpecificationDetails />}
      </div>
    </div>
  );
};
