import LoginSignUpModal from "@/app/layout-components/login-signup";
import { FaCartShopping } from "react-icons/fa6";
import styles from "../../styles.module.css";
import { useCallback, useContext } from "react";
import { MainContext } from "../../helpers";
import { Button, Spinner } from "@nextui-org/react";
import { useAppSelector } from "@/lib/main/hooks";
import { setNestedPath } from "@/app/_utils";
import useConfigManager from "./useConfigManager";

export const ProductBtns = () => {
  const mainContext = useContext(MainContext);
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
          className="text-white"
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

        <Button radius="none" className="text-white bg-buyNowButton" size="lg">
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
