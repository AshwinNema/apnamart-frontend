import { BackArrow, NextArrow } from "@/app/_custom-components";
import { useAppSelector } from "@/lib/main/hooks";
import { menuOption } from "@/lib/main/slices/product-menu/product-menu.slice";
import { Skeleton } from "@nextui-org/react";
import { Fragment } from "react";
import styles from "@/app/styles.module.css";
import useCategoryConfigManager from "./useCategoryConfigManager";
import { ProductSubcategory } from "./product-subcategory";

export const CategoryList = () => {
  const { isLoaded, items } = useAppSelector((state) => state.productMenu);

  const Category = ({ details }: { details: menuOption }) => {
    const [config, handleItemInteraction, goForward, goBackward] =
      useCategoryConfigManager(details);

    return (
      <div className="m-5">
        {" "}
        <div className="font-bold text-xl mb-4">{details.name}</div>
        <div className="relative overflow-hidden">
          <BackArrow
            showArrow={config.firstVisibleIndex > 0}
            goBackward={goBackward}
          />
          <div
            style={{
              transform: `translateX(-${config.translateX}px)`,
            }}
            className={`flex gap-3 relative ${styles["animatedTransition"]}`}
          >
            {details.subCategory.map((details, index) => {
              return (
                <Fragment key={details.id}>
                  <ProductSubcategory
                    details={details}
                    handleItemInteraction={(isIntersecting, bounds) => {
                      handleItemInteraction(index, isIntersecting, bounds);
                    }}
                  />
                </Fragment>
              );
            })}
          </div>
          <NextArrow showArrow={config.showNextArrow} goForward={goForward} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Skeleton isLoaded={isLoaded}>
        <div className="min-h-[100svh]">
          {items.map((item) => {
            return (
              <Fragment key={item.id}>
                <Category details={item} />
              </Fragment>
            );
          })}
        </div>
      </Skeleton>
    </>
  );
};
