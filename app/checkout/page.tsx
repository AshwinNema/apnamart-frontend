"use client";
import { useAppSelector } from "@/lib/main/hooks";

const Page = () => {
  const cartCheckoutItems = useAppSelector((state) => state.cartCheckoutItems);
  console.log(cartCheckoutItems);
  return <></>;
};

export default Page;
