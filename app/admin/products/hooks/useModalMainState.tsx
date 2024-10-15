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
  getSearchList,
  MainModalState,
  setMainState,
  tableDataDataElement,
} from "../helper";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { useProductSelector } from "@/lib/product/hooks";
import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { appEndPoints } from "@/app/_utils/endpoints";

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
      getSearchList(appEndPoints.CATEGORY_LIST, setData("categoryList"));
  }, [tab, isOpen]);

  useEffect(() => {
    tab === tabKeys.items &&
      modalDetails?.id &&
      getItemFilters(modalDetails?.id, (list, filterMap) => {
        const mainFilterItemId =
          list.filter((item) => item.isMainFilter)[0]?.id || null;
        setMultiplePaths(setConfig)([
          ["filterItems", list],
          ["originalFilterItems", filterMap],
          ["mainFilterItemId", mainFilterItemId],
        ]);
      });
  }, [modalDetails?.id, tab]);

  return [config, setConfig, bodyRef];
};

export default useModalMainState;
