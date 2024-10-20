import {
  createUpdateProductConfig,
  MainCreateUpdateProductContext,
  specificationOptions,
} from "@/app/merchant/products/helpers";
import { Select, SelectItem } from "@nextui-org/react";
import { useContext } from "react";
import { produce } from "immer";
import { SpecificationDetails } from "./specification-details";

export const Specifications = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-3 font-bold">
        {" "}
        <div>Specifications</div>
        <SpecificationDetails  />
      </div>
      <div className="flex justify-between items-center mb-3 gap-3">
        <Select
          label="Select specification type"
          color="primary"
          variant="faded"
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
    </div>
  );
};
