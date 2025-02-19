import { TextInput } from "@/app/_custom-components";
import {
  cartItemBtnConfig,
  cartItemMethods,
  cartProduct,
  MainContext,
} from "../../helpers";
import { Button } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { produce } from "immer";
import styles from "@/app/styles.module.css";

export const CartItemBtns = ({ product }: { product: cartProduct }) => {
  const context = useContext(MainContext);
  const [cartConfig, setCartConfig] = useState<cartItemBtnConfig>({
    count: "1",
    isLoading: false,
  });
  useEffect(() => {
    setCartConfig(
      produce((draft) => {
        draft.count = `${product.count}`;
      }),
    );
  }, [product.count]);
  if (!context) return null;
  const { setInputVal, increaseDecreaseCartItem } = cartItemMethods(
    setCartConfig,
    product,
    context.setConfig,
  );
  return (
    <div className="flex items-center gap-3">
      <Button
        className="bg-transparent border-styledBorder border-2 border-solid"
        isIconOnly
        size="sm"
        radius="full"
        onPress={() => {
          setTimeout(() => {
            !cartConfig.isLoading && increaseDecreaseCartItem(-1);
          }, 300);
        }}
        disabled={product.count === 1 || cartConfig.isLoading}
      >
        -
      </Button>
      <TextInput
        value={cartConfig.count}
        type="number"
        variant="flat"
        className="w-[3rem] outline-none focus:outline-styledBorder focus:border-styledBorder border-styledBorder border-[1px] text-center"
        showClearIcon={false}
        setData={setInputVal}
        disabled={cartConfig.isLoading}
        onBlur={() => {
          !cartConfig.count &&
            setCartConfig(
              produce((draft) => {
                draft.count = `${product.count}`;
              }),
            );
        }}
        classNames={{
          inputWrapper: [`${styles["nonShadowInput"]}`],
          input: `text-center`,
        }}
        radius="none"
        size="sm"
      />
      <Button
        className="bg-transparent border-styledBorder border-2 border-solid"
        isIconOnly
        disabled={cartConfig.isLoading}
        onPress={() => {
          setTimeout(() => {
            !cartConfig.isLoading && increaseDecreaseCartItem(1);
          }, 300);
        }}
        size="sm"
        radius="full"
      >
        +
      </Button>
    </div>
  );
};
