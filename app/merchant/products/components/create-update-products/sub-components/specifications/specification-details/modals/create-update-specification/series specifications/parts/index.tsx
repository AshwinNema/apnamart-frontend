import { setNestedPath } from "@/app/_utils";
import { createUpdateSpecificationState } from "@/app/merchant/products/helpers";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export * from "./create-update-inputs";
export * from "./key-vals";

export const AddNewSpecificationBtns = ({
  config,
  setConfig,
}: {
  config: createUpdateSpecificationState;
  setConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>;
}) => {
  return (
    <div className="flex justify-end gap-3 mb-5">
      <Button
        color="secondary"
        onPress={() => setNestedPath(setConfig)("enableHeader", true)()}
      >
        {config.enableHeader ? "Disable " : "Enable "} Header
      </Button>

      {!config.addNewKeyVal ? (
        <Button
          onPress={() => setNestedPath(setConfig)("addNewKeyVal")(true)}
          color="warning"
          className="text-white"
        >
          Add new feature
        </Button>
      ) : null}
    </div>
  );
};
