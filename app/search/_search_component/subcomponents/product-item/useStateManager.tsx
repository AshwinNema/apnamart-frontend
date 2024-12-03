import { useCallback, useEffect, useState } from "react";
import { useHover } from "react-aria";
import { setNestedPath } from "@/app/_utils";
import { DOMAttributes, FocusableElement } from "@react-types/shared";
import { queriedProduct } from "@/app/merchant/products/helpers";

const useStateManager = ({
  productDetails,
}: {
  productDetails: queriedProduct;
}): [
  {
    isClicked: boolean;
    hovered: boolean;
  },
  (key: string, toggleVal?: boolean) => (value?: any) => void,
  DOMAttributes<FocusableElement>,
] => {
  const [config, setConfig] = useState({
    isClicked: !!productDetails?.wishList?.length,
    hovered: false,
  });

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    setData("isClicked")(!!productDetails?.wishList?.length);
  }, [productDetails?.wishList?.length]);

  let { hoverProps } = useHover({
    onHoverStart: () => {
      setData("hovered")(true);
    },
    onHoverEnd: () => {
      setData("hovered")(false);
    },
  });
  return [config, setData, hoverProps];
};

export default useStateManager;
