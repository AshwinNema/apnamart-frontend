export * from "./entity-config";
export * from "./entityLists";

export interface categoryConfig {
  showBackArrow: boolean;
  showNextArrow: boolean;
  translateX: number;
  hasInteracted: boolean;
  itemsLefts: [number, number];
  totalVisibleElements: number;
  lastVisibleIndex: number;
  scrollWidth: number;
}

export type setCategoryConfig = React.Dispatch<
  React.SetStateAction<categoryConfig>
>;

export const defaultCategoryConfig = (): categoryConfig => ({
  showBackArrow: false,
  showNextArrow: false,
  translateX: 0,
  hasInteracted: false,
  itemsLefts: [0, 0],
  totalVisibleElements: 1,
  lastVisibleIndex: 0,
  scrollWidth: 0,
});
