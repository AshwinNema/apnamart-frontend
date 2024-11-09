import { ImageComponent, Spinner } from "@/app/_custom-components";
import { queriedProduct } from "@/app/merchant/products/helpers";
import { useState } from "react";
import { useHover } from "react-aria";
import { useRouter } from "next/navigation";
export const ProductItem = ({
  productDetails,
}: {
  productDetails: queriedProduct;
}) => {
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState(false);
  const [hovered, setHasHovered] = useState(false);
  let { hoverProps } = useHover({
    onHoverStart: () => {
      setHasHovered(true);
    },
    onHoverEnd: () => {
      setHasHovered(false);
    },
  });

  return (
    <>
      <div
        {...hoverProps}
        onClick={() => {
          setShowSpinner(true);
          router.push(`/view-product/${productDetails.id}`);
        }}
        className="flex justify-between gap-3 my-3 cursor-pointer"
      >
        <div className="flex gap-10">
          <div>
            <ImageComponent
              width={100}
              height={100}
              src={productDetails?.photos?.[0]?.url}
              alt="photo"
            />
          </div>
          <div>
            <span className={`font-bold ${hovered && "text-primary"}`}>
              {productDetails?.name}
            </span>
            +
            <ul className="list-disc text-xs">
              {productDetails?.highlights.map((pointer, index) => {
                return <li key={index}>{pointer}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className="font-bold">₹{productDetails.price}</div>
      </div>
      {showSpinner && <Spinner />}
    </>
  );
};
