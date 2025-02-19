"use client";

import { RenderTable } from "@/app/_custom-components";
import useConfigManager from "./useConfigManager";
import { tableColumns } from "./helpers";
import { Skeleton } from "@heroui/react";

const MerchantOrders = () => {
  const [config, renderCell, getData] = useConfigManager();
  return (
    <Skeleton className="min-h-[100svh]" isLoaded={config.isLoaded}>
      <RenderTable
        ariaLabel="Merchant Orders"
        columns={tableColumns()}
        items={config.results}
        renderCell={renderCell}
        isStriped={true}
        page={config.page}
        totalPages={config.totalPages}
        setPage={(page) => getData(page)}
        emptyContent="No orders found"
      />
    </Skeleton>
  );
};

export default MerchantOrders;
