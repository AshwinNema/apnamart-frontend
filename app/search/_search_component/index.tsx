"use client";
import { Fragment } from "react";
import { MainContext } from "./helpers";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { ProductItem } from "./subcomponents/product-item";
import {
  ComponentSkeleton,
  PaginationComponent,
} from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { ProductFilter } from "./subcomponents/product-filter";
import useConfigManager from "./useConfigManager";
import { BiSolidMessageAltError } from "react-icons/bi";

const ProductSearch = ({ type }: { type: "item" | "sub category" }) => {
  const [config, setConfig, queryData] = useConfigManager(type);

  return (
    <>
      {!config.isDataLoaded ? (
        <ComponentSkeleton />
      ) : (
        <div className={`m-3 ${config.innerWidth > 700 ? "flex gap-3" : ""}`}>
          <MainContext.Provider value={{ config, setConfig }}>
            {type === "item" && <ProductFilter />}
          </MainContext.Provider>

          <Card className="w-full">
            <CardBody>
              {config.results.map((productDetails, index) => {
                return (
                  <Fragment key={productDetails.id}>
                    <ProductItem productDetails={productDetails} />
                    {index !== config.results.length - 1 && <Divider />}
                  </Fragment>
                );
              })}
              {!!config.page && !!config.totalResults && (
                <PaginationComponent
                  page={config.page}
                  totalPages={config.totalPages}
                  onChange={(page) => {
                    queryData(page);
                    setNestedPath(setConfig)("page")(page);
                  }}
                />
              )}
              {!config.totalResults && (
                <div className="flex flex-col justify-center h-[80svh]">
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <BiSolidMessageAltError className="scale-[4] fill-dangerTheme" />
                      <div className="font-bold text-lg mt-5 flex justify-center">
                        Sorry, no results found!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProductSearch;
