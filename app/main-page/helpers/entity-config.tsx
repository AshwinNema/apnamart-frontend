import { UserRole } from "@/lib/main/slices/user/user.slice";
import { entityListElement, entityLists } from "./entityLists";

export interface entityData {
  [key: string]: {
    header: string;
    list: entityListElement[];
    description: string;
    footer: string;
  };
}

export const entityConfig: entityData = {
  [UserRole.admin]: {
    header: `🌟 Welcome to the Admin Dashboard! 🌟`,
    list: entityLists.admin,
    description: `As the backbone of our eCommerce platform, you play a crucial role
            in ensuring everything runs smoothly! Here, you have the power to:`,

    footer: `Your efforts help create a seamless shopping experience for our
              users. Let’s make online shopping better together! 🚀`,
  },
  [UserRole.merchant]: {
    header: "🌟 Welcome to Your Merchant Dashboard!🌟",
    description: `As you log in today, get ready to manage your store with ease! 🛍️
            Quickly add new products, keep an eye on your orders 📦, and analyze
            your sales trends 📈. We're here to support you every step of the
            way 🤝. Let’s make your e-commerce journey a success! 🚀`,

    list: entityLists.merchant,
    footer: `With every product you create and every order you fulfill, you
              enhance the shopping experience for our customers. Together, let’s
              build a thriving marketplace! 🌟🚀`,
  },
};
