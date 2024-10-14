import {
  Link,
  Modal,
  ModalContent,
  Skeleton,
  useDisclosure,
  CircularProgress,
  Progress,
} from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FcShop } from "react-icons/fc";

export const Spinner = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
    >
      <ModalContent className="bg-[transparent] shadow-none">
        <div className="spinner-container bg-[transparent] flex items-center justify-center h-screen">
          <CircularProgress />
        </div>
      </ModalContent>
    </Modal>
  );
};

export const ComponentSkeleton = ({
  height = "h-svh",
}: {
  height?: string;
}) => {
  return (
    <Skeleton>
      <div className={`${height}`}></div>
    </Skeleton>
  );
};

export const SpinnerLink = ({
  children,
  color = "foreground",
  href,
}: {
  children: ReactNode;
  color?:
    | "foreground"
    | "danger"
    | "primary"
    | "secondary"
    | "warning"
    | "success";
  href: string;
}) => {
  const [showSpinner, setSpinner] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setSpinner(false);
  }, [path]);
  return (
    <>
      {showSpinner && <Spinner />}
      <Link
        onClick={() => {
          path !== href && setSpinner(true);
        }}
        color={color}
        href={href}
      >
        {children}
      </Link>
    </>
  );
};

export const AppStartLoader = () => {
  return (
    <div className="h-svh flex justify-center mt-52">
      <div className="flex flex-col w-1/2 gap-5">
        <span className="w-full flex justify-center gap-5">
          <FcShop className="scale-[4] mb-5" />
          <div className="font-bold font-serif text-2xl">Apnamart</div>
        </span>
        <Progress className="w-full" isIndeterminate aria-label="Loading..." />
      </div>
    </div>
  );
};
