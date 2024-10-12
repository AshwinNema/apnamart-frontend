import { UserRole } from "@/lib/main/slices/user/user.slice";
import { AiFillProduct } from "react-icons/ai";
import { FcBusinessman } from "react-icons/fc";
import { FaChartArea } from "react-icons/fa";
import { routes } from "../../_utils/routes";
import { LiaFirstOrderAlt } from "react-icons/lia";
const { admin, merchant } = routes;
export interface rolePageDetails {
  label: string;
  link: string;
  icon: JSX.Element;
}

export const roleWiseList = {
  [UserRole.customer]: [],
  [UserRole.merchant]: [
    { label: "Products", link: merchant.product, icon: <AiFillProduct /> },
    { label: "Orders", link: merchant.orders, icon: <LiaFirstOrderAlt /> },
  ],
  [UserRole.admin]: [
    { label: "Products", link: admin.product, icon: <AiFillProduct /> },
    { label: "Merchants", link: admin.merchants, icon: <FcBusinessman /> },
    {
      label: "Delivery Area",
      link: admin.deliveryArea,
      icon: <FaChartArea />,
    },
  ],
};
