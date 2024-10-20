import { setNestedPath } from "@/app/_utils";
import { createUpdateSpecificationState } from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
export * from "./create-update-inputs";
export * from "./key-vals";

export const AddNewBtns = ({
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

export const CancelUpdateKeyValIcons = ({
  type,
  onCancel,
  onSuccess,
}: {
  type: "new" | "edit";
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  return (
    <>
      <Tooltip
        color="success"
        content={<p>{type === "new" ? "Add new " : "update "} feature</p>}
      >
        <span>
          <SiTicktick
            onClick={onSuccess}
            className="fill-successTheme scale-[1.2] cursor-pointer"
          />
        </span>
      </Tooltip>
      <Tooltip
        color="danger"
        content={
          <p>
            Cancel{" "}
            {type === "new"
              ? "adding new feature"
              : "updating the current featuere"}
          </p>
        }
      >
        <span>
          <GiCancel
            onClick={onCancel}
            className="fill-dangerTheme scale-[1.2] cursor-pointer"
          />
        </span>
      </Tooltip>
    </>
  );
};
