import { Dispatch, SetStateAction } from "react";
import * as _ from "lodash";

const getNestedPath = (obj: any, index: number, path: string | string[]) => {
  if (typeof path === "string")
    return getNestedPath(obj, index, path.split("."));
  if (!obj || typeof obj != "object" || Array.isArray(obj)) return;
  const curPath = path[index];
  const curVal = obj[curPath];
  if (index === path.length - 1) return curVal;
  return getNestedPath(curVal, index + 1, path);
};

export const setNestedPath =
  (setDataFunc: Dispatch<SetStateAction<any>>) =>
  (key: string, toggleVal?: boolean) =>
  (value?: any) => {
    setDataFunc((prevVal: Object) => {
      if (toggleVal) {
        const curVal = getNestedPath(prevVal, 0, key);
        _.set(prevVal, key, !curVal);
        return { ...prevVal };
      }
      _.set(prevVal, key, value);
      return { ...prevVal };
    });
  };

export type setKeyVal = (
  key: string,
  toggleVal?: boolean,
) => (value?: any) => void;

export type setVal = (value: any) => void;

export type keyVals = [string, any];

export type valueOf<T> = T[keyof T];

export const setMultiplePaths =
  (setDataFunc: Dispatch<SetStateAction<any>>) => (pathValList: keyVals[]) => {
    setDataFunc((prevVal: Object) => {
      pathValList.forEach(([key, val]) => {
        _.set(prevVal, key, val);
      });
      return { ...prevVal };
    });
  };

export type multiplePathSetter = (pathValList: keyVals[]) => void;
