import { useAppSelector } from "@/lib/main/hooks";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { subCategory } from "@/lib/main/slices/product-menu/product-menu.slice";

const useConfigManager = (): [
  {
    row1: subCategory[];
    row2: subCategory[];
    innerWidth: number;
  },
] => {
  const productMenu = useAppSelector((state) => state.productMenu.items);
  const [config, setConfig] = useState<{
    row1: subCategory[];
    row2: subCategory[];
    innerWidth: number;
  }>({
    row1: [],
    row2: [],
    innerWidth: 1000,
  });
  const length = productMenu.length;
  useEffect(() => {
    if (!length) return;
    const subCategoryList = productMenu.reduce(
      (list: subCategory[], details) => {
        list.push(...details.subCategory);
        return list;
      },
      [],
    );
    const subCategoryListLength = subCategoryList.length;
    setConfig(
      produce((draft) => {
        draft.row1 = subCategoryList.slice(
          0,
          Math.ceil(subCategoryListLength / 2),
        );
        draft.row2 = subCategoryList.slice(
          Math.ceil(subCategoryListLength / 2),
        );
      }),
    );
  }, [length, productMenu]);

  useEffect(() => {
    const checkResize = () => {
      setConfig(
        produce((draft) => {
          draft.innerWidth = window.innerWidth;
        }),
      );
    };
    checkResize();
    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  return [config];
};

export default useConfigManager;
