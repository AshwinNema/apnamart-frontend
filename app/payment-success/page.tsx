"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

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

              <div className="mt-10 ">Payment Successful</div>
            </div>
          </CardHeader>
          <CardBody className="text-leadText">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Page;
