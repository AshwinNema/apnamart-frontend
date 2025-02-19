import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import React, { Key, useCallback, useEffect, useState } from "react";
import { AutoCompleteProps, autoCompleteState } from "./interface";
import { HTTP_METHODS } from "@/app/_services";
import { setMultiplePaths } from "@/app/_utils";
import { autoCompleteFetchData, onAutoCompleteSelectionChange } from "./utils";
import { produce } from "immer";
// Note - For documentation regarding this component please refer AutoCompleteProps(type definition of props for this component)
export const AutoCompleteComponent = ({
  size = "md",
  variant = "flat",
  color = "default",
  method = HTTP_METHODS.GET,
  processLogic,
  labelPlacement = "inside",
  selectedKey,
  ...props
}: AutoCompleteProps): React.JSX.Element => {
  const [config, setConfig] = useState<autoCompleteState>({
    itemList: [],
    inputValue: "",
    selectedKey: null,
  });
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const { itemList, inputValue } = config;

  useEffect(() => {
    autoCompleteFetchData(processLogic, method, setMultipleData, props.url);
  }, [props.url]);

  return (
    <>
      <Autocomplete
        label={props.label}
        variant={variant}
        allowsEmptyCollection={false}
        fullWidth={!!props.fullWidth}
        size={size}
        color={color}
        selectedKey={
          selectedKey !== undefined ? selectedKey : config.selectedKey
        }
        placeholder={props.placeholder}
        inputValue={
          typeof props.inputVal === "string" ? props.inputVal : inputValue
        }
        onInputChange={(val: string) => {
          setConfig(
            produce((draft) => {
              draft.inputValue = val;
              if (!val) draft.selectedKey = null;
            }),
          );
          !val && props.onSelectionChange(null);
          props.setInputVal && props.setInputVal(val);
        }}
        isClearable={!!props.isClearable}
        allowsCustomValue={props.allowsCustomValue}
        items={props.list ? props.list : itemList}
        labelPlacement={labelPlacement}
        onSelectionChange={(key: Key | null) => {
          onAutoCompleteSelectionChange(
            key,
            props.list ? props.list : itemList,
            setMultipleData,
            props.onSelectionChange,
            props.setInputVal,
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
