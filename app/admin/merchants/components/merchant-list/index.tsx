import { useEffect, useState } from "react";
import {
  merchantListActionHandler,
  merchantListState,
  merchantSelectStatus,
  merchantTableProps,
} from "../../helper";
import {
  blockUnBlockMerchant,
} from "./utils/api";
import { MerchantListTable } from "./table";
import { setNestedPath } from "@/app/_utils";
import { SelectedMerchantRegistration } from "../merchant-registration/sub-components";
import { MerchantTypeSelect } from "./type-select";
import { queryMerchantList } from "./utils";

export const MerchantList = () => {
  const [config, setConfig] = useState<merchantListState>({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    results: [],
    selectedRegistrationDetails: null,
    type: merchantSelectStatus.all,
  });

  const queryData = (page: number) => {
    queryMerchantList(page, config, setConfig);
  };

  useEffect(() => {
    queryData(config.page);
  }, [config.page, config.type]);

  const merchantHandler = (details: {
    type: "block" | "unblock";
    merchantRegistrationId: number;
  }) => {
    blockUnBlockMerchant(details, () => {
      queryData(config.page);
    });
  };

  const merchantTableAction: merchantTableProps["onClick"] = (data, type) => {
    merchantListActionHandler(data, type, merchantHandler, setConfig);
  };

  return (
    <>
      <MerchantTypeSelect config={config} setConfig={setConfig} />
      <SelectedMerchantRegistration
        config={config}
        setConfig={setConfig}
        getData={queryData}
        goBackTooltipText="Go back to merchant list"
        goBackBtnText="View merchant list"
      />
      <MerchantListTable
        config={config}
        queryData={queryData}
        setData={setNestedPath(setConfig)}
        onClick={merchantTableAction}
      />
    </>
  );
};
