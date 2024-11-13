import { useContext } from "react";
import { MainContext } from "../../helpers";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ProductImages = () => {
  const mainContext = useContext(MainContext);
  if (!mainContext) return null;
  const { config } = mainContext;

  const { details } = config;
  if (!details) return null;
  return (
    <>
    </>
  );
};
