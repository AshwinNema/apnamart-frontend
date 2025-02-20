"use client";
import { Image } from "@heroui/react";
import NextImage from "next/image";
import { useAppSelector } from "@/lib/main/hooks";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { Spinner } from "./loaders";

export * from "./inputs";
export * from "./leaflet";
export * from "./drawer";
export * from "./table";
export * from "./loaders";
export * from "./stepper";
export * from "./buttons";
export * from "./chatbox";
export * from "./pagination";
export * from "./custom-icons";
export * from "./img-viewer";
export * from "./arrows";

export { default as CustomImagePreviewer } from "./image-previewer";

export const ImageComponent = ({
  width,
  height,
  src,
  alt,
  className,
  isBlurred = false,
  onImgClick,
}: {
  width: number | string;
  height: number | string;
  src: string;
  alt: string;
  className?: string;
  isBlurred?: boolean;
  onImgClick?: () => void;
}) => {
  return (
    <Image
      isBlurred={isBlurred}
      as={NextImage}
      width={width}
      onClick={() => {
        onImgClick && onImgClick();
      }}
      height={height}
      src={src}
      alt={alt}
      className={`${className || ""}`}
    />
  );
};

export const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: ReactNode;
  allowedRole?: UserRole;
}) => {
  const user = useAppSelector((state) => state.user);
  const role = user?.role;
  const router = useRouter();

  useEffect(() => {
    !user && router.push("/");
  }, [user, router]);

  // If allowedRole is given then we check that user is logging in with that allowed role
  useEffect(() => {
    !!allowedRole && role != allowedRole && router.push("/");
  }, [allowedRole, role, router]);

  return <> {user ? children : <Spinner />}</>;
};
