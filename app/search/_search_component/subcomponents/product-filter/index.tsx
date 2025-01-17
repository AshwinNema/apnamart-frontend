import { Card, CardBody, Divider } from "@nextui-org/react";
import { PriceFilter } from "./price-filter";
import { ItemFilters } from "./item-filters";
import { FilterHeader } from "./filter-header";
import { useContext } from "react";
import { MainContext } from "../../helpers";

export const ProductFilter = () => {
  const context = useContext(MainContext);
  if (!context) return null;
  const { config } = context;
  const { itemFilters, priceFilter, innerWidth } = config;
  if (!priceFilter && !itemFilters.length) return null;
  return (
    <div>
      <Card
        classNames={{
          header: ["flex", "flex-col"],
          base: [
            `min-w-[15rem] ${config.innerWidth > 700 ? "max-w-[20svw]" : "mb-3"}`,
          ],
        }}
        className="w-full"
      >
        <FilterHeader />
        <Divider />
        <CardBody>
          <PriceFilter />
          <ItemFilters />
        </CardBody>
      </Card>
    </div>
  );
};
