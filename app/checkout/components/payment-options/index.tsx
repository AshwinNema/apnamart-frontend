import { Fragment, useContext, useEffect, useState } from "react";
import {
  changeCheckoutPaymentMethod,
  MainContext,
  paymentSelectOptions,
} from "../../helpers";
import { Accordion, AccordionItem, Checkbox } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";
import Script from "next/script";
import { useAppSelector } from "@/lib/main/hooks";
import {
  EventLoader,
  loaderEvents,
  useEventLoaderEmitter,
} from "@/app/_custom-components";

export const PaymentOptions = () => {
  const context = useContext(MainContext);
  const loaderEmitter = useEventLoaderEmitter();
  const [accordionVal, setAccordionVal] = useState<Set<string>>(new Set([]));
  const user = useAppSelector((state) => state.user);
  const { theme } = useTheme();

  useEffect(() => {
    if (!context) return;
    context?.config?.selectedStage === 2 && setAccordionVal(new Set(["1"]));
    context?.config?.selectedStage !== 2 && setAccordionVal(new Set([]));
  }, [context?.config?.selectedStage]);

  if (!context) return null;

  const { config } = context;
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Accordion selectedKeys={accordionVal}>
        <AccordionItem
          key={"1"}
          classNames={{
            base: ["mt-3"],
            title: "text-white ml-5 font-medium",
            subtitle: "text-slate-300 ml-5 text-xs",
            heading: "bg-primary",
            indicator: "mr-5",
            content: `${theme === browserTheme.dark ? "bg-slate-900" : "bg-slate-200"} p-0`,
          }}
          title="Payment Options"
          aria-label="Payment Options"
        >
          {paymentSelectOptions.map((paymentOption) => {
            const isSelectedPayment = config.paymentMode === paymentOption.key;
            return (
              <Fragment key={paymentOption.key}>
                <div
                  onClick={() => {
                    changeCheckoutPaymentMethod(
                      paymentOption.key,
                      context,
                      user,
                      () => {
                        loaderEmitter.next({
                          type: loaderEvents.routeNavigation,
                          route: "/payment-sucess",
                        });
                      },
                    );
                  }}
                  className={`p-5 cursor-pointer ${theme === browserTheme.dark ? isSelectedPayment && "bg-slate-600" : isSelectedPayment && "bg-slate-50"} }`}
                >
                  <Checkbox
                    isSelected={config.paymentMode === paymentOption.key}
                  >
                    {paymentOption.label}
                  </Checkbox>
                </div>
              </Fragment>
            );
          })}
        </AccordionItem>
      </Accordion>
      <EventLoader emitter={loaderEmitter} />
    </>
  );
};
