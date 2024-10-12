import { get, set, remove } from "local-storage";

export enum storageAttributes {
  user = "user",
  tokens = "tokens",
  theme = "theme",
}

export enum sessionStorageAttributes {
  userFetch = "isUserFetched",
  pendingMerchantRegistration = "pendingMerchantRegistration",
}

export function getLocalStorageKey<T>(attribute: storageAttributes): T {
  return get(attribute);
}

export function getSessionStorageKey(attribute: sessionStorageAttributes) {
  return JSON.parse(
    window.sessionStorage.getItem(attribute) || JSON.stringify(null),
  );
}

export const setLocalStorageKey = (
  attribute: storageAttributes,
  value: any,
) => {
  set(attribute, value);
};

export const setSessionStorageKey = (
  attribute: sessionStorageAttributes,
  value: any,
) => {
  window.sessionStorage.setItem(attribute, JSON.stringify(value));
};

export const removeLocalStorageKey = (key: storageAttributes) => {
  remove(key);
};

export const removeSessionStorageKey = (key: sessionStorageAttributes) => {
  window.sessionStorage.removeItem(key);
};

export const clearUserStorage = () => {
  removeLocalStorageKey(storageAttributes.tokens);
  removeLocalStorageKey(storageAttributes.user);
  return null;
};

export const redirect = (route: string) => {
  window.location.href = `${window.location.href}${route}`;
};
