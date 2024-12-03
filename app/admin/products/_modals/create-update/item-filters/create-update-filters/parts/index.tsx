import { AutoComplete, TextInput } from "@/app/_custom-components";
import { setKeyVal } from "@/app/_utils";
import {
  createUpdateItemState,
  FilterContext,
  filterTypeOptions,
} from "@/app/admin/products/helper";
import { useContext } from "react";

export { default as Footer } from "./footer";

export const CommonInputs = ({
  config,
  setData,
}: {
  config: createUpdateItemState;
  setData: setKeyVal;
}) => {
  const mainState = useContext(FilterContext);

  if (!mainState) return null;
  const { mainConfig } = mainState;
  return (
    <>
      <TextInput
        label="Name"
        variant="underlined"
        className="mb-3"
        value={
          mainConfig.createUpdateFilterOption
            ? config.optionCreateUpdateName
            : config.name
        }
        setData={(val: string) => {
          if (mainConfig.createUpdateFilterOption) {
            return setData("optionCreateUpdateName")(val);
          }
          return setData("name")(val);
        }}
      />
      {!mainConfig.createUpdateFilterOption && (
        <AutoComplete
          label="Filter Type"
          selectedKey={config.filterType}
          list={filterTypeOptions}
          inputVal={config.filterTypeVal}
          setInputVal={setData("filterTypeVal")}
          onSelectionChange={(key) => {
            setData("filterType")(key);
          }}
          isClearable={false}
          fullWidth={true}
        />
      )}
    </>
  );
};
