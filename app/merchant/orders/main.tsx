"use client";

import { RenderTable } from "@/app/_custom-components";
import useConfigManager from "./useConfigManager";
import { tableColumns } from "./helpers";

const MerchantOrders = () => {
  const [config, renderCell, getData] = useConfigManager();
  return (
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
  );
};

export default MerchantOrders;
