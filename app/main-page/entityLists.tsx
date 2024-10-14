import { UserRole } from "@/lib/main/slices/user/user.slice";
import { LiaFirstOrderAlt } from "react-icons/lia";
import { AiFillProduct } from "react-icons/ai";
import { FcBusinessman } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { routes } from "../_utils";
import React from "react";

export interface entityListElement {
  key: string;
  icon: React.JSX.Element;
  description: string;
  title: string;
}

export interface entityListData {
  [key: string]: entityListElement[];
}

export const entityLists: entityListData = {
  [UserRole.admin]: [
    {
      key: routes.admin.merchants,
      icon: <FcBusinessman />,
      description:
        "🛍️ Oversee and support our merchants to help them thrive in our marketplace.",
      title: "Manage Merchants",
    },
    {
      key: routes.admin.deliveryArea,
      icon: <FaMapLocationDot />,
      description:
        "📍 Define and manage delivery zones to ensure our customers receive their orders on time.",
      title: "Set Delivery Area",
    },
    {
      key: routes.admin.product,
      icon: <AiFillProduct />,
      description:
        "📦Add, update, or remove products to keep our inventory fresh and appealing.",
      title: "Manage Products",
    },
  ],
  [UserRole.merchant]: [
    {
      key: routes.merchant.product,
      icon: <AiFillProduct />,
      description:
        "As a merchant, you can easily create new products 🛍️, view your current listings 📦, and manage your inventory with simplicity. Take control of your store and watch your business thrive! 📈✨",
      title: "🛍️ Product Management Made Simple! 📦",
    },
    {
      key: routes.merchant.orders,
      icon: <LiaFirstOrderAlt />,
      description: `As a merchant, you can effortlessly view and manage all orders placed against your products. Simply navigate to the "Orders" section to track sales, check order details, and monitor statuses. If you need to cancel an order, just select it and click the "Cancel Order" button—it's quick and straightforward! Stay organized and keep your customers informed with real-time updates on their orders. Your success is just a click away! 🌟`,
      title: "🛒 Manage Your Orders with Ease! 📦",
    },
  ],
};
