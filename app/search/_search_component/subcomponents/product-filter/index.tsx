import { Card, CardBody, Divider } from "@nextui-org/react";
import { PriceFilter } from "./price-filter";
import { ItemFilters } from "./item-filters";
import { FilterHeader } from "./filter-header";

export const ProductFilter = () => {
  return (
    <div>
      <Card
        classNames={{
          header: ["flex", "flex-col"],
          base: ["min-w-[15rem] max-w-[20svw]"],
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
