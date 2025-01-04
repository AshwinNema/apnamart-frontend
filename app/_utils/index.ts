import * as _ from "lodash";
import { ZodError, ZodSchema, ZodObject } from "zod";
import { getLocalStorageKey, storageAttributes } from "../_services";
import { browserTheme } from "../layout-components/theme-switch";
import { errorToast } from ".";
import { toastErrorIcons } from ".";
export * from "./routes";
export * from "./icons & logos";
export * from "./toast";
export * from "./endpoints";
export * from "./data-setter";

export const passwordRegex =
  /(?=.*[A-Z])(?=.*\d).{8,}|(?=.*\d)(?=.*[A-Z]).{8,}/;

export const passwordErrMsg =
  "Password must contain atleast 1 capital letter, 1 number and should have a min length of 8";

export const getZodErrMsg = (error: ZodError<any>) => {
  return error.issues.map((issue) => issue.message).join(", ");
};

export const validateZodSchema = <T>(
  validationData: T,
  validation: ZodSchema<T> | ZodObject<any>,
  throwErr?: boolean,
  errorIcon?: toastErrorIcons,
) => {
  const { error, data } = validation.safeParse(validationData);
  let errMsg = "";
  if (error) {
    errMsg = getZodErrMsg(error);
  }
  if (error && throwErr) {
    errorToast({
      msg: errMsg,
      iconType: errorIcon,
    });
  }

  return { error, data, errMsg };
};
// Note - Do not use this in components to get theme instead use useTheme  (next-themes) because it does not gets rerendered
export const getBrowserTheme = (): browserTheme => {
  return getLocalStorageKey(storageAttributes.theme) || browserTheme.light;
};

export enum variants {
  goBackBtn = "shadow",
}

export const webSocketReadyState = {
  "0": "CONNECTING_STATE",
  "1": "OPEN_STATE",
  "2": "CLOSING_STATE",
  "3": "CLOSED_STATE",
  CONNECTING_STATE: 0,
  OPEN_STATE: 1,
  CLOSING_STATE: 2,
  CLOSED_STATE: 3,
};

export const convertFirstLetterToUpperCase = (str: string) => {
  if (!str || typeof str !== "string") return "";
  return str.split("_").reduce((acc, curr) => {
    return acc + " " + curr.charAt(0).toUpperCase() + curr.slice(1);
  }, "");
};

export function addOrdinalSuffix(num: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const suffixPosition = num % 100;
  return (
    `${num}` +
    (suffixes[(suffixPosition - 20) % 10] ||
      suffixes[suffixPosition] ||
      suffixes[0])
  );
}

export function getMonthName(monthIndex: number) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
}
