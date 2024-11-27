import {
  loaderEvents,
  EventLoader,
  ImageComponent,
} from "@/app/_custom-components";
import { queriedProduct } from "@/app/merchant/products/helpers";
import useStateManager from "./useStateManager";
import useEventLoaderEmitter from "@/app/_custom-components/loaders/event-loader/useEventLoaderEmitter";
import { ProductLikedHeart } from "@/app/_shared-Components/product-liked-heart";

export const ProductItem = ({
  productDetails,
}: {
  productDetails: queriedProduct;
}) => {
  const eventEmitter = useEventLoaderEmitter();
  const [config, setData, hoverProps] = useStateManager({ productDetails });

  return (
    <>
      <div
        {...hoverProps}
        onClick={() => {
          eventEmitter.next({
            type: loaderEvents.routeNavigation,
            route: `/view-product/${productDetails.id}`,
          });
        }}
        className="flex justify-between gap-3 my-3 cursor-pointer"
      >
        <div className="flex gap-10">
          <div className="flex gap-3 items-start">
            <ImageComponent
              width={100}
              height={100}
              src={productDetails?.photos?.[0]?.url}
              alt="photo"
            />
            <div className="relative">
              <div
                className="absolute -top-[50px] -right-[50px] scale-30"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ProductLikedHeart
                  styles={{
                    transform: "scale(0.5)",
                  }}
                  productId={productDetails.id}
                  isClicked={config.isClicked}
                  setIsClicked={setData("isClicked")}
                />
              </div>
            </div>
          </div>
          <div>
            <span className={`font-bold ${config.hovered && "text-primary"}`}>
              {productDetails?.name}
            </span>
            <ul className="list-disc text-xs">
              {productDetails?.highlights.map((pointer, index) => {
                return <li key={index}>{pointer}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className="font-bold">₹{productDetails.price}</div>
      </div>
      <EventLoader emitter={eventEmitter} />
    </>
  );
};
