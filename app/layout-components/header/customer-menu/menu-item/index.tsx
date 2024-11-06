import {
  subCategory,
  menuOption,
} from "@/lib/main/slices/product-menu/product-menu.slice";
import { useHover } from "react-aria";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { ImageComponent } from "@/app/_custom-components";
import { SubCategoryItemList, SubCategoryList } from "./sub-components";
import { useTheme } from "next-themes";
import { browserTheme } from "@/app/layout-components/theme-switch";

export const MenuItem = ({ details }: { details: menuOption }) => {
  const [hasHovered, setHasHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<null | subCategory>(null);
  let { hoverProps } = useHover({
    onHoverStart: () => {
      setHasHovered(true);
    },
    onHoverEnd: () => {
      setSelectedSubCategory(null);
      setHasHovered(false);
    },
  });
  const { theme } = useTheme();

  return (
    <div {...hoverProps} className="flex-col">
      <div className="flex justify-center">
        <ImageComponent
          className="rounded-full"
          width={50}
          height={50}
          src={details.photo}
          alt="Category photo"
        />
      </div>
      <div className="relative">
        <div
          className={`flex items-center break-all justify-center ${hasHovered ? "text-mainTheme" : ""}`}
        >
          <div className="text-xs break-all">{details.name} </div>
          <div>{hasHovered ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
        </div>

        <div ref={containerRef} className="relative">
          {hasHovered ? (
            <div className="absolute top-0 w-full">
              <div className="flex">
                <div
                  className={`relative z-50 hover:z-50 flex flex-col gap-1 p-1 shadow-medium w-full ${theme === browserTheme.dark ? "bg-content1" : "bg-cardWhite"} min-w-max`}
                >
                  <ul className="w-full flex flex-col gap-0.5 outline-none">
                    {details.subCategory.map((subCategory) => {
                      return (
                        <Fragment key={subCategory.id}>
                          <SubCategoryList
                            setSelectedSubCategory={setSelectedSubCategory}
                            subCategory={subCategory}
                          />
                        </Fragment>
                      );
                    })}
                  </ul>
                </div>
                {!!selectedSubCategory?.items?.length && (
                  <SubCategoryItemList itemList={selectedSubCategory?.items} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
