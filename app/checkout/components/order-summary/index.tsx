import { Accordion, AccordionItem, Button } from "@heroui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  defaultOrderSummaryConfig,
  MainContext,
  orderSummaryConfig,
} from "../../helpers";
import { produce } from "immer";
import { OrderSummaryItem } from "./summary-item";
import { MdOutlineError } from "react-icons/md";
import { NextStepContinueBtn } from "./accordion-continue-btn";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";

export const OrderSummary = () => {
  const [config, setConfig] = useState<orderSummaryConfig>(
    defaultOrderSummaryConfig(),
  );
  const context = useContext(MainContext);
  const { theme } = useTheme();
  useEffect(() => {
    if (!context) return;

    !context?.config?.selectedStage &&
      setConfig(
        produce((draft) => {
          draft.accordionVal = new Set(["1", "2"]);
        }),
      );

    context?.config?.selectedStage &&
      setConfig(
        produce((draft) => {
          draft.accordionVal = new Set([]);
        }),
      );
  }, [context?.config?.selectedStage]);
  if (!context) return null;
  const { config: mainConfig } = context;
  const { cartItems, selectedStage } = mainConfig;
  return (
    <>
      <Accordion selectedKeys={config.accordionVal}>
        <AccordionItem
          key={"1"}
          classNames={{
            base: ["mt-3"],
            title: "text-white ml-5 font-medium",
            subtitle: "text-slate-300 ml-5 text-xs",
            heading: "bg-primary",
            indicator: "mr-5",
            content: `${theme === browserTheme.dark ? "bg-slate-900" : "bg-slate-200"}`,
          }}
          indicator={({ isOpen }) => {
            return (
              <>
                {!isOpen && selectedStage && selectedStage > 1 && (
                  <Button
                    onPress={() => {
                      context.setConfig(
                        produce((draft) => {
                          draft.selectedStage = null;
                        }),
                      );
                    }}
                    radius="none"
                    className="bg-white text-primary font-medium"
                  >
                    Change
                  </Button>
                )}
              </>
            );
          }}
          title="Order Summary"
          aria-label="Order Summary"
        >
          {cartItems.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <OrderSummaryItem index={index} item={item} />
              </Fragment>
            );
          })}

          {!cartItems.length && (
            <div className="flex items-center gap-2 p-5 text-base font-medium">
              <MdOutlineError className="fill-dangerTheme scale-[1.5]" /> Your
              cart is empty
            </div>
          )}
        </AccordionItem>
      </Accordion>
      <NextStepContinueBtn config={config} />
    </>
  );
};
