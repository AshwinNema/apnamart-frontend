import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getItemFilters,
  getMainDefaultState,
  getItemEntityList,
  MainModalState,
  setMainState,
  tableDataDataElement,
} from "../helper";
import { appEndPoints, setMultiplePaths, setNestedPath } from "@/app/_utils";
import { useProductSelector } from "@/lib/product/hooks";
import { tabKeys } from "@/lib/product/slices/component-details.slice";

const useModalMainState = (): [
  MainModalState,
  Dispatch<SetStateAction<MainModalState>>,
  MutableRefObject<HTMLDivElement | null>,
] => {
  const [config, setConfig] = useState<MainModalState>(getMainDefaultState());
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const isOpen = useProductSelector((state) => state.componentDetails.isOpen);
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;

  useEffect(() => {
    !isOpen && setConfig(getMainDefaultState());
  }, [isOpen]);

  useEffect(() => {
    setMainState(modalDetails, setConfig, bodyRef);
  }, [modalDetails, isOpen]);

  useEffect(() => {
    isOpen &&
      tab !== tabKeys.category &&
      getItemEntityList(setData("categoryList"));
  }, [tab, isOpen]);

  useEffect(() => {
    !config.categoryId && setData("subCatList")([]);
    tab === tabKeys.items &&
      isOpen &&
      config.categoryId &&
      getItemEntityList(
        setData("subCatList"),
        appEndPoints.SUB_CATEGORY_LIST,
        {
          categoryId: config.categoryId,
        },
        {
          showLoader: false,
        },
      );
  }, [config.categoryId, tab, isOpen]);

  useEffect(() => {
    tab === tabKeys.items &&
      modalDetails?.id &&
      getItemFilters(modalDetails?.id, (list, filterMap) => {
        setMultiplePaths(setConfig)([
          ["filterItems", list],
          ["originalFilterItems", filterMap],
        ]);
      });
  }, [modalDetails?.id, tab]);

  return [config, setConfig, bodyRef];
};

export default useModalMainState;
