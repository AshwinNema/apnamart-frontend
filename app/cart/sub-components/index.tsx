import { ComponentSkeleton, ImageComponent } from "@/app/_custom-components";
export * from "./cart-item";
export * from "./cards";

export const LoaderSkeleton = () => {
  return (
    <>
      <ComponentSkeleton height="h-[40svh] w-full"></ComponentSkeleton>
      <ComponentSkeleton height="h-[40svh] w-full"></ComponentSkeleton>
    </>
  );
};

export const EmptyCart = () => {
  return (
    <div className="flex justify-center">
      <div>
        <ImageComponent
          src="https://res.cloudinary.com/ash006/image/upload/v1733491627/fwzjodfvjrejzhfiden2.png"
          alt="Empty cart"
          width={400}
          height={400}
        />
        <div className="flex justify-center font-medium text-xl">
          Your cart is empty!
        </div>
      </div>
    </div>
  );
};
