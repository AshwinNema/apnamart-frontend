import {
  EventLoader,
  ImageComponent,
  loaderEvents,
  useEventLoaderEmitter,
} from "@/app/_custom-components";
import { subCategory } from "@/lib/main/slices/product-menu/product-menu.slice";
import { useEffect, useRef } from "react";
import { useHover } from "react-aria";

export const ProductSubcategory = ({
  details,
  handleItemInteraction,
}: {
  details: subCategory;
  handleItemInteraction: (isIntersecting: boolean, bounds: DOMRect) => void;
}) => {
  const emitter = useEventLoaderEmitter();
  const containerRef = useRef<null | HTMLDivElement>(null);
  let { hoverProps, isHovered } = useHover({
    onHoverStart: (e) => {},
  });
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        if (!containerRef.current) return;
        const bounds = containerRef.current.getBoundingClientRect();
        handleItemInteraction(isIntersecting, bounds);
      },
      {
        threshold: 1,
      },
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        {...hoverProps}
        onClick={() => {
          emitter.next({
            type: loaderEvents.routeNavigation,
            route: `/search/by-subcategory/${details.id}`,
          });
        }}
        className="min-w-[300px] cursor-pointer"
        ref={containerRef}
      >
        <ImageComponent
          src={details.photo}
          alt="Sub category photo"
          width={250}
          height={250}
        />
        <div
          className={`font-bold text-sm flex justify-center break-all w-[250px] mt-2 ${isHovered && "text-primary"}`}
        >
          {details.name}
        </div>
      </div>

      <EventLoader emitter={emitter} />
    </>
  );
};
