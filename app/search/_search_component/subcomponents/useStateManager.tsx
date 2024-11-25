import { useCallback, useEffect, useState } from "react";
import { useHover } from "react-aria";
import { setNestedPath } from "@/app/_utils";
import { DOMAttributes, FocusableElement } from "@react-types/shared";
import { useDisclosure } from "@nextui-org/react";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { queriedProduct } from "@/app/merchant/products/helpers";

const useStateManager = ({
  productDetails,
}: {
  productDetails: queriedProduct;
}): [
  {
    isClicked: boolean;
    hovered: boolean;
    modalType: null | modalTypes;
  },
  (key: string, toggleVal?: boolean) => (value?: any) => void,
  DOMAttributes<FocusableElement>,
  () => void,
  boolean,
  () => void,
] => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState({
    isClicked: !!productDetails?.wishList?.length,
    hovered: false,
    modalType: null,
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

  const openModal = () => {
    setData("modalType")(modalTypes.login);
    onOpen();
  };

  return [config, setData, hoverProps, openModal, isOpen, onOpenChange];
};

export default useStateManager;
