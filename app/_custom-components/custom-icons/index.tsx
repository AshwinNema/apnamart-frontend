import { TiArrowBackOutline } from "react-icons/ti";
import { TiArrowForwardOutline } from "react-icons/ti";

interface commonIconProps {
  onClick?: () => void;
  className?: string;
}

export const BackIcon = ({ onClick, className = "" }: commonIconProps) => {
  return (
    <TiArrowBackOutline
      onClick={onClick}
      className={`scale-[1.5] cursor-pointer ${className}`}
    />
  );
};

export const ForwardIcon = ({ onClick, className = "" }: commonIconProps) => {
  return (
    <TiArrowForwardOutline
      onClick={onClick}
      className={`scale-[1.5] cursor-pointer ${className}`}
    />
  );
};
