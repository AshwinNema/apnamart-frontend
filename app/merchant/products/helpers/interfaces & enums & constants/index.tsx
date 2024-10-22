export * from "./specifications";
export * from "./create-update-product-config";
export * from "./description";

export interface mainConfig {
  currentState: "create" | "update" | "main screen";
}
