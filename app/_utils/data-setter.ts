import { Dispatch, SetStateAction } from "react";
import * as _ from "lodash";
import { produce } from "immer";
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
    setDataFunc(
      produce((draft: any) => {
        if (toggleVal) {
          const curVal = getNestedPath(draft, 0, key);
          _.set(draft, key, !curVal);
          return;
        }
        _.set(draft, key, value);
      }),
    );
  };

export type setVal = (value: any) => void;

export type setKeyVal = (key: string, toggleVal?: boolean) => setVal;

export type keyVals = [string, any];

export type valueOf<T> = T[keyof T];

export const setMultiplePaths =
  (setDataFunc: Dispatch<SetStateAction<any>>) => (pathValList: keyVals[]) => {
    setDataFunc(
      produce((draft: any) => {
        pathValList.forEach(([key, val]) => {
          _.set(draft, key, val);
        });
      }),
    );
  };

export type multiplePathSetter = (pathValList: keyVals[]) => void;
