import { paymentOptions } from "@/app/checkout/helpers";
import { Dispatch, SetStateAction } from "react";
import { columns } from "@/app/_custom-components";
import { orderItem } from "@/app/merchant/orders/helpers";

export interface order {
  id: number;
  customerId: number;
  totalOrderAmount: number;
  cancellationUser: number | null;
  orderStatus: string;
  cancellationTime: string | null;
  cancellationReason: string | null;
  paymentMode: string;
  paymentStatus: string;
  razorPayOrderId: string | null;
  razorpayPaymentId: string | null;
  archive: boolean;
  orderItems: orderItem[];
  createdAt: Date;
}
export interface mainConfig {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  results: order[];
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
