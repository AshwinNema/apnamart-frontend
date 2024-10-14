import { useCallback, useContext } from "react";
import {
  createUpdateFilterState,
  getItemFilterHeader,
  FilterContext,
} from "../../../helper";
import { Button } from "@nextui-org/react";
import { setNestedPath } from "@/app/_utils";

export const Header = () => {
  const filterState = useContext(FilterContext);
  if (!filterState) return;
  const { mainConfig: config, setMainConfig: setConfig } = filterState;
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold">{getItemFilterHeader(config)}</div>
      {(!config.createUpdateFilter || !config.createUpdateFilterOption) && (
        <Button
          className="cursor-pointer"
          onPress={() => {
            if (!config.createUpdateFilter) {
              setData("createUpdateFilter")(createUpdateFilterState.create);
              return;
            }
            setData("createUpdateFilterOption")(createUpdateFilterState.create);
          }}
          disabled={true}
          variant="flat"
          color="secondary"
        >
          Create
          {config.createUpdateFilter ? " Filter Option" : " Filter"}
        </Button>
      )}
    </div>
  );
};
