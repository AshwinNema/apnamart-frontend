import { passwordErrMsg, passwordRegex } from "@/app/_utils";
import { z } from "zod";

export interface roleDetailsInterface {
  src: string;
  role: string;
  roleHeader: string;
  loginIntro: string;
}

export interface roleCard extends roleDetailsInterface {
  selectedRole: string;
  setRole: (arg: string) => void;
}

export type userRoleKeys = "customer" | "merchant" | "admin";

interface userRoleDetails {
  src: string;
  role: userRoleKeys;
  roleHeader: string;
  loginIntro: string;
  signUpIntro?: string;
  userSignedUpText?: string;
}

interface userRoles {
  [key: string]: userRoleDetails;
}

export const userRoles: userRoles = {
  customer: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1730567161/z6jw4vldtmz47vp5akzq.png",
    role: "customer",
    roleHeader: "Customer",
    loginIntro:
      "🔐 Please enter your login details below to access your account. If you are a new customer, you can create an account by clicking on the ‘Sign Up’ link. Thank you for choosing our services. 🚀",
    signUpIntro:
      "Thank you for choosing to join us! Your journey with Apnamart starts here. Fill out the form below to unlock a world of shopping convenience and exclusive offers. We can't wait to have you on board! 🌟",
    userSignedUpText:
      "🎉 Welcome to Apnamart! 🛒 We're delighted to have you join our online shopping community. Explore our wide range of products and enjoy a seamless shopping experience. If you have any questions or need assistance, feel free to reach out. Thank you for choosing Apnamart! 🌟 Happy shopping! 🛍️💻🌺",
  },
  merchant: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1730565383/fzby6arzpb6k3zioaiiy.png",
    role: "merchant",
    roleHeader: "Merchant",
    loginIntro:
      "Please enter your credentials below to access your account. 🔑 If you are a new merchant and would like to sign up, please register. 📝 Our admins will be verifying and approving your account on the portal. ✅ Thank you for choosing to partner with us! 🤝✨",
    signUpIntro:
      "Welcome, esteemed merchant! 🎉 We're delighted to have you on board. Your products and services are a valuable addition to our marketplace. 🛍️ Please complete the form below to start showcasing your offerings to our discerning customers. Let's create a successful partnership together! 🤝✨",
    userSignedUpText:
      "🎉 Welcome to Apnamart! 🎉 We're thrilled to have you join our vibrant community of merchants! 🛍️✨ Get ready to showcase your amazing products and connect with customers who value quality and sustainability. 🌱 If you need any assistance, our team is here to help you every step of the way. Let’s make magic happen together! 🤝💚",
  },
  admin: {
    src: "https://res.cloudinary.com/ash006/image/upload/v1730565386/h2d5htexkxbojohcgb0k.png",
    role: "admin",
    roleHeader: "Admin",
    loginIntro:
      "Please enter your login details below to access your account. 🔐 As an admin, you play a crucial role in managing our online store. 🌟 Thank you for your dedication to enhancing our ecommerce platform! 💻🛍️",
  },
};

export type loginConfig = {
  formData: {
    role: userRoleKeys;
    email: string;
    password: string;
    name: string;
  };
  currentStep: number;
};

export const defaultConfig = {
  formData: {
    role: userRoles.customer.role,
    email: "",
    password: "",
    name: "",
  },
  currentStep: 0,
};

export enum modalTypes {
  login = "login",
  signUp = "signUp",
}
const roleEnum = z.enum(["customer", "merchant", "admin"]);

export const loginValidationSchema = z.object({
  role: roleEnum,
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message: passwordErrMsg,
  }),
});

export const signUpValidationSchema = loginValidationSchema.merge(
  z.object({
    name: z.string(),
  }),
);
