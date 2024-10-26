import { TextInput } from "@/app/_custom-components";
import {
  CancelUpdateKeyValIcons,
  CreateUpdateDescriptionContext,
  newKeyValValidation,
} from "@/app/merchant/products/helpers";
import { useContext } from "react";
import { produce } from "immer";
import { setKeyVal, validateZodSchema } from "@/app/_utils";
import * as _ from "lodash";

export const NonTextSeriesInput = ({
  setData,
  onAdd,
}: {
  setData: setKeyVal;
  onAdd: (key: string, val: string) => void;
}) => {
  const mainDescriptionContext = useContext(CreateUpdateDescriptionContext);
  if (!mainDescriptionContext) return null;
  const { config, setConfig } = mainDescriptionContext;
  return (
    <div
      className={`flex gap-3 ${!config.addNewKeyVal && "invisible"} items-center my-3`}
    >
      <TextInput
        value={config.newKey}
        setData={setData("newKey")}
        label="Feature Key"
        placeholder="Feature Key"
      />

      <TextInput
        value={config.newVal}
        setData={setData("newVal")}
        label="Feature Value"
        placeholder="Feature Value"
      />
      <CancelUpdateKeyValIcons
        type="new"
        onCancel={() => {
          setConfig(
            produce((draft) => {
              draft.addNewKeyVal = false;
              draft.newVal = "";
              draft.newKey = "";
            }),
          );
        }}
        onSuccess={() => {
          const details = _.pick(config, ["newVal", "newKey"]);
          const { error, data } = validateZodSchema(
            details,
            newKeyValValidation,
            true,
          );
          if (error || !data) return;
          onAdd(data.newKey, data.newVal);
          setData("addNewKeyVal")(false);
        }}
      />
    </div>
  );
};
