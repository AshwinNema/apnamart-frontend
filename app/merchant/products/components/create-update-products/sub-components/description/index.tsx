import {
  createUpdateProductConfig,
  descriptionOptions,
  MainCreateUpdateProductContext,
} from "@/app/merchant/products/helpers";
import { Select, SelectItem } from "@heroui/react";
import { useContext } from "react";
import { produce } from "immer";
import { DescriptionDetails } from "./description-details";
import styles from "@/app/styles.module.css";

export const Description = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <div className="mb-5">
      <div
        className={`${styles["product-specification-description-grid"]} mb-3 font-bold items-center gap-3`}
      >
        <div>Description</div>
        <Select
          label="Select description type"
          selectedKeys={[config.descriptionType]}
          onChange={(e) => {
            setConfig(
              produce((draft) => {
                const descriptionType = e.target
                  .value as createUpdateProductConfig["descriptionType"];
                draft.descriptionType = descriptionType;
                if (descriptionType === "string") {
                  draft.description = "";
                  return;
                }
                draft.description = [];
              }),
            );
          }}
        >
          {descriptionOptions.map((selectedOption) => (
            <SelectItem key={selectedOption.key}>
              {selectedOption.label}
            </SelectItem>
          ))}
        </Select>
        <DescriptionDetails />
      </div>
    </div>
  );
};
