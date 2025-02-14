import { setNestedPath } from "@/app/_utils";
import {
  CreateUpdateDescriptionContext,
  createUpdateDescriptionState,
  seriesDescription,
  seriesDescriptionTypeOptions,
} from "@/app/merchant/products/helpers";
import { Button, Select, SelectItem } from "@heroui/react";
import { useContext } from "react";
import { produce } from "immer";
import { v4 } from "uuid";
import styles from "@/app/styles.module.css";

export const AddNewDescriptionBtns = () => {
  const mainDescriptionContext = useContext(CreateUpdateDescriptionContext);
  if (!mainDescriptionContext) return null;
  const { config, setConfig } = mainDescriptionContext;
  return (
    <div className="flex justify-between items-center gap-3 mb-5">
      <Select
        fullWidth={true}
        label="Select description type"
        selectedKeys={[config.seriesDescriptionType]}
        onChange={(e) => {
          const val = e.target.value as
            | createUpdateDescriptionState["seriesDescriptionType"]
            | null;
          if (!val) return;

          setConfig(
            produce((draft) => {
              draft.seriesDescriptionType = val;
              const newDetails: seriesDescription = {
                ...(draft.details as seriesDescription),
                id: (draft.details as seriesDescription)?.id || v4(),
                header: "",
                details: [],
              };
              if (val === "text") newDetails.details = "";

              draft.details = newDetails;
              draft.newKey = "";
              draft.newVal = "";
              draft.addNewKeyVal = false;
            }),
          );
        }}
      >
        {seriesDescriptionTypeOptions.map((descriptionType) => {
          return (
            <SelectItem key={descriptionType.key}>
              {descriptionType.value}
            </SelectItem>
          );
        })}
      </Select>

      <div className="flex gap-3 items-center">
        <Button
          color="secondary"
          onPress={() => setNestedPath(setConfig)("enableHeader", true)()}
        >
          {config.enableHeader ? "Disable " : "Enable "} Header
        </Button>

        {config.seriesDescriptionType !== "text" && !config.addNewKeyVal ? (
          <Button
            onPress={() => setNestedPath(setConfig)("addNewKeyVal")(true)}
            color="warning"
            className={`text-white ${styles["hover-text-white"]}`}
          >
            Add new feature
          </Button>
        ) : null}
      </div>
    </div>
  );
};
