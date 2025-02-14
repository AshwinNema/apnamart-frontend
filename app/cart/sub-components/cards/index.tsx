import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from "@heroui/react";
import { useContext, useState } from "react";
import { getTotalPrice, MainContext } from "../../helpers";

export const PriceDetailsCard = () => {
  const context = useContext(MainContext);
  if (!context) return null;
  const { config } = context;
  const productLength = config.products.length;
  const totalPrice = getTotalPrice(config.products);
  return (
    <div>
      <Card
        radius="none"
        classNames={{
          header: ["font-medium", "text-leadText"],
          footer: ["font-medium", "text-lg"],
        }}
      >
        <CardHeader>Price Details</CardHeader>
        <Divider></Divider>
        <CardBody>
          <div className="flex justify-between gap-3">
            <span>
              Price ({`${productLength} Item${productLength > 1 ? "s" : ""}`} )
            </span>
            <span>₹{totalPrice}</span>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between border-dashed border-styledBorder border-y-2 gap-3 w-full">
            <span>Total Amount</span>
            <span>₹{totalPrice}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const PlaceOrderCard = () => {
  const context = useContext(MainContext);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  if (!context) return null;

  return (
    <Card
      classNames={{
        body: ["flex", "justify-end"],
      }}
      radius="none"
    >
      <CardBody>
        <div className="flex justify-end">
          <Button
            radius="none"
            onPress={() => {
              setShowLoader(true);
              router.push("/checkout");
            }}
            className={`text-white text-center ${showLoader ? "bg-gray-700" : "bg-buyNowButton"}`}
            size="lg"
          >
            <Spinner className={`${!showLoader && "invisible"}`} />
            Place Order
            {<Spinner className="invisible" />}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
