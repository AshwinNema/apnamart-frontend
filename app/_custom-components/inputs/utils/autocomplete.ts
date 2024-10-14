import {
  getZodErrMsg,
  keyVals,
  multiplePathSetter,
  setKeyVal,
} from "@/app/_utils";
import {
  AutoCompleteProps,
  autoCompleteState,
  TextInputState,
} from "../interface";
import { ZodSchema } from "zod";
import React from "react";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services";

export const invalidTextInputCheck = (
  value: string,
  validationSchema: ZodSchema | undefined,
  setDataFunc: setKeyVal,
) => {
  if (!value || !validationSchema) {
    return false;
  }
  const validation = validationSchema.safeParse(value);
  if (validation.error) {
    const errMsg = getZodErrMsg(validation.error);
    setDataFunc("errorMsg")(errMsg);
  }

  return !validation.success;
};

export const onAutoCompleteSelectionChange = (
  key: React.Key | null,
  list: autoCompleteState["itemList"],
  setMultipleData: multiplePathSetter,
  onSelectionChange: AutoCompleteProps["onSelectionChange"],
  setInputVal: AutoCompleteProps["setInputVal"],
) => {
  const label =
    list.find((item) => {
      return item.id == key;
    })?.label || "";
  const update: keyVals[] = [
    ["inputValue", label],
    ["selectedKey", key],
  ];
  setInputVal && setInputVal(label);
  setMultipleData(update);
  onSelectionChange(key as string | null);
};

export const autoCompleteFetchData = (
  processLogic: AutoCompleteProps["processLogic"],
  method: AutoCompleteProps["method"] = HTTP_METHODS.GET,
  setMultipleData: multiplePathSetter,
  url?: string,
) => {
  url &&
    processLogic &&
    makeDataRequest(method, url).then((res) => {
      const { data, inputVal, selectedKey } = processLogic(res);
      const update: keyVals[] = [
        ["itemList", data],
        ["inputValue", inputVal],
        ["selectedKey", selectedKey],
      ];
      setMultipleData(update);
    });
};

export const getDefultAutcompleteState = () => ({
  itemList: [],
  inputValue: "",
  selectedKey: null,
});
