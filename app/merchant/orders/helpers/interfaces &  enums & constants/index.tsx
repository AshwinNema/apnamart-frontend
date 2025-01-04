import { paymentOptions } from "@/app/checkout/helpers";
import { Dispatch, SetStateAction } from "react";
import { uploadedImgDetails } from "../../../products/helpers";
import { columns } from "@/app/_custom-components";

interface order {
  id: number;
  paymentMode: paymentOptions;
  paymentStatus: string;
}

export interface product {
  name: string;
  photos: uploadedImgDetails[];
}

export interface orderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  productId: number;
  orderId: number;
  archive: boolean;
  order: order;
  product: product;
}

export interface mainConfig {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: orderItem[];
}

export type setMainConfig = Dispatch<SetStateAction<mainConfig>>;

export const tableColumns = (): columns[] => {
  return [
    {
      key: "name",
      label: "Name",
      align: "center",
    },
    {
      key: "price",
      label: "Per unit earning",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "totalPrice",
      label: "Total earning",
    },
    {
      key: "paymentMode",
      label: "Payent Mode",
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
    },
  ];
};
