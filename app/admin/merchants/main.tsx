import { useCallback, useState } from "react";
import { tabKeys, tabList, tabOption } from "./helper";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { setNestedPath } from "@/app/_utils";

const AdminMerchantSection = () => {
  const [config, setConfig] = useState({
    tab: tabKeys.newRegistration,
  });

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Merchant Tab Options"
        color="primary"
        variant="underlined"
        fullWidth
        selectedKey={config.tab}
        onSelectionChange={(key) => {
          if (key === config.tab) return;
          setData("tab")(key);
        }}
      >
        {tabList.map((tab: tabOption) => {
          const { Content } = tab;
          return (
            <Tab className="h-full" key={tab.key} title={tab.key}>
              <Card className="h-full">
                <CardBody>
                  <Content />
                </CardBody>
              </Card>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default AdminMerchantSection;
