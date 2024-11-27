import {
  item,
  subCategory,
} from "@/lib/main/slices/product-menu/product-menu.slice";
import { IoIosArrowForward } from "react-icons/io";
import { useHover } from "react-aria";
import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { EventLoader, loaderEvents } from "@/app/_custom-components";
import useEventLoaderEmitter from "@/app/_custom-components/loaders/event-loader/useEventLoaderEmitter";

export const SubCategoryItemList = ({ itemList }: { itemList: item[] }) => {
  const { theme } = useTheme();
  const eventEmitter = useEventLoaderEmitter();
  return (
    <>
      <div
        className={`relative z-50 hover:z-50 flex flex-col gap-1 p-1 shadow-medium w-full ${theme === browserTheme.dark ? "bg-content1" : "bg-cardWhite"} min-w-max`}
      >
        <ul className="w-full flex flex-col gap-0.5 outline-none">
          {itemList.map((item) => {
            return (
              <li
                onClick={() => {
                  eventEmitter.next({
                    type: loaderEvents.routeNavigation,
                    route: `/search/by-item/${item.id}`,
                  });
                }}
                key={item.id}
                className="flex z-10 group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small hover:text-bold subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none"
              >
                <span className="flex-1 text-small font-normal hover:font-bold break-all">
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <EventLoader emitter={eventEmitter} />
    </>
  );
};

export const SubCategoryList = ({
  subCategory,
  setSelectedSubCategory,
}: {
  subCategory: subCategory;
  setSelectedSubCategory: Dispatch<SetStateAction<subCategory | null>>;
}) => {
  const eventEmitter = useEventLoaderEmitter();
  let { hoverProps } = useHover({
    onHoverStart: () => {
      setSelectedSubCategory(subCategory);
    },
  });

  return (
    <>
      <li
        onClick={() => {
          eventEmitter.next({
            type: loaderEvents.routeNavigation,
            route: `/search/by-subcategory/${subCategory.id}`,
          });
        }}
        className="flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none hover:text-primary hover:bg-primary/20"
        {...hoverProps}
      >
        <span className="flex-1 text-small font-normal break-all">
          {subCategory.name}
        </span>
        {!!subCategory.items.length && (
          <div>
            <IoIosArrowForward />
          </div>
        )}
        <EventLoader emitter={eventEmitter} />
      </li>
    </>
  );
};
