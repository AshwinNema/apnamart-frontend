import { Button } from "@heroui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const BackArrow = ({
  showArrow,
  goBackward,
}: {
  showArrow: boolean;
  goBackward: () => void;
}) => {
  return (
    <>
      {showArrow && (
        <Button
          onPress={goBackward}
          radius="full"
          isIconOnly
          className={`absolute z-[10] top-[50%] text-center cursor-pointer flex justify-center items-center`}
        >
          <FaAngleLeft />
        </Button>
      )}
    </>
  );
};

export const NextArrow = ({
  showArrow,
  goForward,
}: {
  showArrow: boolean;
  goForward: () => void;
}) => {
  return (
    <>
      {showArrow && (
        <Button
          onPress={goForward}
          radius="full"
          isIconOnly
          className={`absolute z-[10] right-0 top-[50%] text-center cursor-pointer flex justify-center items-center`}
        >
          <FaAngleRight />
        </Button>
      )}
    </>
  );
};
