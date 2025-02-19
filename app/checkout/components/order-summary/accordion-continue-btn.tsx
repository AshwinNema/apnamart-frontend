import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useContext } from "react";
import { MainContext, orderSummaryConfig } from "../../helpers";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { produce } from "immer";

export const NextStepContinueBtn = ({
  config,
}: {
  config: orderSummaryConfig;
}) => {
  const context = useContext(MainContext);
  const { theme } = useTheme();
  if (!context) return null;

  return (
    <>
      {!!context.config.cartItems.length && !context.config.selectedStage && (
        <Accordion selectedKeys={config.accordionVal}>
          <AccordionItem
            key={"1"}
            classNames={{
              base: ["mt-2"],
              heading: `flex w-full pr-5 justify-end text-white  font-medium ${theme === browserTheme.dark ? "bg-gray-900" : "bg-slate-200"}`,
              content: "w-0 h-0",
            }}
            title={
              <>
                <div className="w-full flex justify-end">
                  <Button
                    radius="none"
                    size="lg"
                    onPress={() => {
                      context.setConfig(
                        produce((draft) => {
                          draft.selectedStage = 2;
                        }),
                      );
                    }}
                    className="text-white text-xs bg-buyNowButton scale-x-150 focus:scale-x-150"
                  >
                    Continue
                  </Button>
                </div>
              </>
            }
            indicator={<></>}
            aria-label="Order Summary Continue Button"
          ></AccordionItem>
        </Accordion>
      )}
    </>
  );
};
