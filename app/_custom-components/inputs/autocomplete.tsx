import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import * as _ from "lodash";
import React, { Key, useCallback, useEffect, useState } from "react";
import { AutoCompleteProps, autoCompleteState } from "./interface";
import { HTTP_METHODS } from "@/app/_services";
import { setMultiplePaths } from "@/app/_utils";
import { autoCompleteFetchData, onAutoCompleteSelectionChange } from "./utils";
// Note - For documentation regarding this component please refer AutoCompleteProps(type definition of props for this component)
export const AutoCompleteComponent = ({
  label,
  size = "md",
  variant = "flat",
  color = "default",
  method = HTTP_METHODS.GET,
  url,
  list,
  onSelectionChange,
  processLogic,
  isClearable,
  labelPlacement = "inside",
  fullWidth,
  allowsCustomValue,
  selectedKey,
  inputVal,
  setInputVal,
}: AutoCompleteProps): React.JSX.Element => {
  const [config, setConfig] = useState<autoCompleteState>({
    itemList: [],
    inputValue: "",
    selectedKey: null,
  });
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const { itemList, inputValue } = config;

  useEffect(() => {
    autoCompleteFetchData(processLogic, method, setMultipleData, url);
  }, [url]);

  return (
    <>
      <Autocomplete
        label={label}
        variant={variant}
        allowsEmptyCollection={false}
        fullWidth={!!fullWidth}
        size={size}
        color={color}
        selectedKey={
          selectedKey !== undefined ? selectedKey : config.selectedKey
        }
        inputValue={typeof inputVal === "string" ? inputVal : inputValue}
        onInputChange={(val: string) => {
          setConfig((prevConfig) => {
            prevConfig.inputValue = val;
            if (!val) prevConfig.selectedKey = null;
            return { ...prevConfig };
          });
          !val && onSelectionChange(null);
          setInputVal && setInputVal(val);
        }}
        isClearable={!!isClearable}
        allowsCustomValue={allowsCustomValue}
        items={list ? list : itemList}
        labelPlacement={labelPlacement}
        onSelectionChange={(key: Key | null) => {
          onAutoCompleteSelectionChange(
            key,
            list ? list : itemList,
            setMultipleData,
            onSelectionChange,
            setInputVal,
          );
        }}
      >
        {(item: any) => (
          <AutocompleteItem
            startContent={
              <>
                {item.photo ? (
                  <Avatar
                    alt={item.label}
                    className="w-6 h-6"
                    src={item.photo}
                  />
                ) : null}
              </>
            }
            key={item.id}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default AutoCompleteComponent;
