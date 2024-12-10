import { checkoutItem } from "@/lib/main/slices/checkout-items/checkout-items.slice";
import { cartItemHelpers, MainContext } from "../../../helpers";
import { useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { produce } from "immer";
import styles from "@/app/styles.module.css";
import { TextInput } from "@/app/_custom-components";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";

export const CartItemBtns = ({
  item,
  index,
}: {
  item: checkoutItem;
  index: number;
}) => {
  const [config, setConfig] = useState({ count: "1" });

  useEffect(() => {
    setConfig(
      produce((draft) => {
        draft.count = `${item.count}`;
      }),
    );
  }, [item.count]);
  const context = useContext(MainContext);
  const { theme } = useTheme();
  if (!context) return null;
  const { increaseDecreaseItemCount, setInputVal } = cartItemHelpers(
    item,
    context.setConfig,
    index,
    setConfig,
  );

  return (
    <div className="flex items-center gap-3">
      <Button
        className={`${theme !== browserTheme.dark && "bg-white"} border-styledBorder border-2 border-solid`}
        isIconOnly
        size="sm"
        radius="full"
        onPress={increaseDecreaseItemCount(-1)}
        disabled={item.count === 1}
      >
        -
      </Button>
      <TextInput
        value={config.count}
        type="number"
        variant="flat"
        className="w-[3rem] outline-none focus:outline-styledBorder focus:border-styledBorder border-styledBorder border-[1px] text-center"
        showClearIcon={false}
        setData={setInputVal}
        onBlur={() => {
          !config.count &&
            setConfig(
              produce((draft) => {
                draft.count = `${item.count}`;
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
        className={`${theme !== browserTheme.dark && "bg-white"} border-styledBorder border-2 border-solid`}
        isIconOnly
        onPress={increaseDecreaseItemCount(1)}
        size="sm"
        radius="full"
      >
        +
      </Button>
    </div>
  );
};
