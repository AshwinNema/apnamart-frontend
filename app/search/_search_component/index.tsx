"use client";
import { useParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { queryProducts } from "./helpers";
import {
  mainConfig,
  getDefaultMainConfig,
} from "./helpers/interfaces & constants & enums";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { ProductItem } from "./subcomponents";
import { PaginationComponent } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { useAppSelector } from "@/lib/main/hooks";
const ProductSearch = ({ type }: { type: "item" | "sub category" }) => {
  const params = useParams();
  const { id } = params;
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const user = useAppSelector((state) => state.user);
  const queryData = useCallback(
    (page: number) => {
      if (!Number(id)) return;

      queryProducts(
        {
          page,
          limit: config.limit,
          [type === "item" ? "itemId" : "subCategoryId"]: Number(id),
        },
        setConfig,
      );
    },
    [type, id],
  );

  useEffect(() => {
    queryData(config.page);
  }, [user]);

  return (
    <>
      <Card classNames={{ base: ["m-3"] }}>
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
        </CardBody>
      </Card>
    </>
  );
};

export default ProductSearch;
