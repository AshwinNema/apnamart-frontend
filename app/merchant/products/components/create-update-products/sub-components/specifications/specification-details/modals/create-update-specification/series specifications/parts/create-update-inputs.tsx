import { TextInput } from "@/app/_custom-components";
import { setNestedPath, validateZodSchema } from "@/app/_utils";
import {
  createUpdateSpecificationState,
  newSpecificationValidation,
} from "@/app/merchant/products/helpers";
import { Dispatch, SetStateAction, useCallback } from "react";
import { CancelUpdateKeyValIcons } from ".";
import * as _ from "lodash";

export const AddSeriesInputs = ({
  config,
  setConfig,
  onAdd,
}: {
  config: createUpdateSpecificationState;
  setConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>;
  onAdd: (key: string, val: string) => void;
}) => {
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  return (
    <>
      <div className={`${!config.enableHeader && "invisible"}`}>
        <TextInput
          fullWidth={true}
          value={
            typeof config.details !== "string"
              ? (config?.details?.header as string)
              : ""
          }
          setData={setData("details.header")}
          label="Feature Header"
          placeholder="Feature Header"
        />
      </div>
      <div className={`flex gap-3 ${!config.addNewKeyVal && "invisible"} items-center my-3`}>
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
            setData("addNewKeyVal")(false);
          }}
          onSuccess={() => {
            const details = _.pick(config, ["newVal", "newKey"]);
            const { error, data } = validateZodSchema(
              details,
              newSpecificationValidation,
              true,
            );
            if (error || !data) return;
            onAdd(data.newKey, data.newVal);
            setData("addNewKeyVal")(false);
          }}
        />
      </div>
    </>
  );
};
