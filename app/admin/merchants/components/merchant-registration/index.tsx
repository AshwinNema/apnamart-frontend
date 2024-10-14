import { useEffect, useState } from "react";
import { queryMerchantRegistration } from "./apis";
import { newRegistrationDetails, newRegistrationState } from "../../helper";
import { MainTable, SelectedMerchantRegistration } from "./sub-components";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

function NewMerchantRegistration() {
  const [config, setConfig] = useState<
    newRegistrationState<newRegistrationDetails>
  >({
    page: 1,
    limit: 5,
    totalPages: 0,
    totalResults: 0,
    results: [],
    selectedRegistrationDetails: null,
  });

  const getData = (page: number) => {
    queryMerchantRegistration(
      {
        page,
        limit: config.limit,
        registrationStatus: merchantRegistrationStatus.adminReview,
      },
      setConfig,
    );
  };
  useEffect(() => {
    getData(1);
  }, []);

  return (
    <div className="mb-3">
      <SelectedMerchantRegistration
        config={config}
        setConfig={setConfig}
        getData={getData}
      />
      <MainTable config={config} setConfig={setConfig} getData={getData} />
    </div>
  );
}

export default NewMerchantRegistration;
