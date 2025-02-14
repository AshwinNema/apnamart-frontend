"use client";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentOptions } from "../checkout/helpers";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const isCashPayment = params.get("paymentMode") === paymentOptions.cash;
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <Card
          classNames={{
            base: ["min-h-[400px]", "min-w-[400px]"],
            header: ["flex", "justify-center", "font-bold"],
            body: ["mt-5"],
          }}
        >
          <CardHeader>
            <div>
              <div className="mt-5 flex justify-center">
                <IoMdCheckmarkCircleOutline className="fill-successTheme scale-[3] " />
              </div>

              <div className="mt-10 ">
                {isCashPayment ? "Order placed" : "Payment Successful"}{" "}
              </div>
            </div>
          </CardHeader>
          <CardBody className="text-leadText">
            Thank you for your purchase.{" "}
            {isCashPayment
              ? "Your order is successfully placed."
              : "Your payment has been processed successfully."}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Page;
