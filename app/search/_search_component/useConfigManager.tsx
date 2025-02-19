import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getQueryProductsQuery, queryProducts } from "./helpers";

import {
  mainConfig,
  getDefaultMainConfig,
  setMainConfig,
} from "./helpers/interfaces & constants & enums";
import { useAppSelector } from "@/lib/main/hooks";
import { getItemFilters, itemFilterType } from "@/app/admin/products/helper";
import { produce } from "immer";

const useConfigManager = (
  type: "item" | "sub category",
): [mainConfig, setMainConfig, (page: number) => void] => {
  const params = useParams();
  const { id } = params;
  const [config, setConfig] = useState<mainConfig>(getDefaultMainConfig());
  const user = useAppSelector((state) => state.user);
  const optionLength = Object.keys(config.selectedOptions).length;
  const queryData = useCallback(
    (page: number) => {
      if (!Number(id)) return;
      const query = getQueryProductsQuery(page, config, type, Number(id));
      queryProducts(query, setConfig);
    },
    [type, id, optionLength, config.minPriceId, config.maxPriceId],
  );

  useEffect(() => {
    setConfig(
      produce((draft) => {
        draft.page = 1;
      }),
    );
    queryData(1);
  }, [
    user,
    config.minPriceId,
    config.maxPriceId,
    config.selectedOptions,
    optionLength,
  ]);

  useEffect(() => {
    const itemId = Number(id);
    if (!itemId || type !== "item") return;
    getItemFilters(itemId, undefined, (list: mainConfig["itemFilters"]) => {
      const { itemFilters, priceFilter } = list.reduce(
        (
          details: {
            itemFilters: mainConfig["itemFilters"];
            priceFilter: mainConfig["priceFilter"];
          },
          filter,
        ) => {
          if (filter.filterType === itemFilterType.price) {
            details.priceFilter = filter as mainConfig["priceFilter"];
          }
          filter.filterType !== itemFilterType.price &&
            details.itemFilters.push(filter);
          return details;
        },
        { itemFilters: [], priceFilter: null },
      );
      setConfig(
        produce((draft) => {
          draft.itemFilters = itemFilters;
          draft.priceFilter = priceFilter;
        }),
      );
    });
  }, [id, type]);

  useEffect(() => {
    const checkResize = () => {
      setConfig(
        produce((draft) => {
          draft.innerWidth = window.innerWidth;
        }),
      );
    };
    checkResize();
    window.addEventListener("resize", checkResize);
    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  return [config, setConfig, queryData];
};

export default useConfigManager;
