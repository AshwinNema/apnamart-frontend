import { useContext, useEffect, useState } from "react";
import {
  addRemoveCartProduct,
  MainContext,
  productBtnConfig,
  setProductBtnConfig,
} from "../../helpers";
import { useDisclosure } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { modalTypes } from "@/app/layout-components/login-signup/constants";
import { produce } from "immer";
import { useParams, useRouter } from "next/navigation";
import { setCartCount } from "@/lib/main/slices/cart-count/cart-count.slice";

const useConfigManager = (): [
  () => void,
  productBtnConfig,
  setProductBtnConfig,
  boolean,
  () => void,
] => {
  const mainContext = useContext(MainContext);
  const { id } = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [config, setConfig] = useState<productBtnConfig>({
    modalType: modalTypes.login,
    showAddCartLoader: false,
    showBuyNowSpinner: false,
  });

  useEffect(() => {
    !isOpen &&
      setConfig(
        produce((draft) => {
          draft.modalType = modalTypes.login;
        }),
      );
  }, [isOpen]);

  const cartBtnPress = () => {
    if (!user) {
      onOpen();
      return;
    }
    if (!mainContext) return;
    setConfig(
      produce((draft) => {
        draft.showAddCartLoader = true;
      }),
    );
    if (mainContext?.config?.details?.cartQuantity) {
      router.push("/cart");
      return;
    }
    addRemoveCartProduct(
      Number(id),
      { connect: true },
      () => {
        setConfig(
          produce((draft) => {
            draft.showAddCartLoader = false;
          }),
        );
      },
      (count: number) => {
        setConfig(
          produce((draft) => {
            draft.showAddCartLoader = false;
          }),
        );
        dispatch(setCartCount(count));
        mainContext.setConfig(
          produce((draft) => {
            if (draft.details) {
              draft.details.cartQuantity = 1;
            }
          }),
        );
      },
      { showLoader: false },
    );
  };

  return [cartBtnPress, config, setConfig, isOpen, onOpenChange];
};

export default useConfigManager;
