export * from "./entity-config";
export * from "./entityLists";

export interface categoryConfig {
  showNextArrow: boolean;
  translateX: number;
  hasInteracted: boolean;
  itemsLefts: [number, number];
  firstVisibleIndex: number;
}

export type setCategoryConfig = React.Dispatch<
  React.SetStateAction<categoryConfig>
>;

export const defaultCategoryConfig = (): categoryConfig => ({
  showNextArrow: false,
  translateX: 0,
  hasInteracted: false,
  itemsLefts: [0, 0],
  firstVisibleIndex: 0,
});
