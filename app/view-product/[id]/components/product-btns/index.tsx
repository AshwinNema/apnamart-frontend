import LoginSignUpModal from "@/app/layout-components/login-signup";
import { FaCartShopping } from "react-icons/fa6";
import styles from "../../styles.module.css";
import { useCallback, useContext } from "react";
import { MainContext } from "../../helpers";
import { Button, Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { setNestedPath } from "@/app/_utils";
import useConfigManager from "./useConfigManager";
import { setCartCheckoutItems } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { useRouter } from "next/navigation";
import { produce } from "immer";

export const ProductBtns = () => {
  const mainContext = useContext(MainContext);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [cartBtnPress, config, setConfig, isOpen, onOpenChange] =
    useConfigManager();
  const user = useAppSelector((state) => state.user);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  if (!mainContext) return null;

  return (
    <>
      <div
        className={`mt-6 ${styles["cartBtns"]}`}
        style={{
          marginLeft: `${mainContext.config.buttonLeftMargin}px`,
        }}
      >
        <Button
          radius="none"
          className={`text-white ${config.showAddCartLoader && "bg-gray-700"}`}
          size="lg"
          color="warning"
          onPress={cartBtnPress}
        >
          <FaCartShopping />
          {config.showAddCartLoader ? (
            <Spinner />
          ) : (
            <>
              {!mainContext?.config?.details?.cartQuantity || !user
                ? "Add to Cart"
                : "Go to cart"}
            </>
          )}
        </Button>

        <Button
          onPress={() => {
            const {
              config: { details },
            } = mainContext;
            if (!details) return;
            setConfig(
              produce((draft) => {
                draft.showBuyNowSpinner = true;
              }),
            );
            dispatch(
              setCartCheckoutItems([
                {
                  count: 1,
                  details,
                },
              ]),
            );
            router.push("/checkout");
          }}
          radius="none"
          className={`text-white ${config.showBuyNowSpinner ? "bg-gray-700" : "bg-buyNowButton"}`}
          size="lg"
        >
          {config.showBuyNowSpinner && <Spinner />}
          Buy Now
        </Button>
      </div>
      <LoginSignUpModal
        modalType={config.modalType}
        setModalType={setData("modalType")}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};