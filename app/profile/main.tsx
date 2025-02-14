import { Tabs, Tab } from "@heroui/react";
import { MainProfileStateContext, tabOption } from "./utils";

import useMainState from "./useMainState";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setTab, tabKeys } from "@/lib/profile/slices/component-state.slice";

function UserProfile() {
  const user = useProfileSelector((state) => state.user);
  const [tabOptions, config, setConfig] = useMainState();
  const dispatch = useProfileDispatch();
  const tab = useProfileSelector((state) => state.componentState.tab);

  if (!user?.role) return null;
  return (
    <div>
      <MainProfileStateContext.Provider
        value={{
          config,
          setConfig,
        }}
      >
        <div>
          <Tabs
            color="primary"
            variant={`${config.width > 750 ? "bordered" : "solid"}`}
            aria-label="Options"
            placement={`${config.width > 750 ? "start" : "top"}`}
            classNames={{
              base: `${config.width > 750 ? "mt-10 ml-3" : "w-full"}`,
              panel: `${config.width > 750 ? "mt-10" : "pt-0"}`,
              tabList: `${config.width > 750 ? "" : "w-full"}`,
            }}
            radius={`${config.width > 750 ? "sm" : "none"}`}
            size={`${config.width > 750 ? "lg" : "md"}`}
            selectedKey={tab}
            onSelectionChange={(key) => {
              if (key === tabKeys.profile) {
                return;
              }
              if (tab !== key) {
                dispatch(setTab(key));
              }
            }}
          >
            {tabOptions.map((tabOption: tabOption) => {
              const { Content } = tabOption;
              return (
                <Tab
                  key={tabOption.key}
                  className={`min-h-16 w-full ${tabOption.additionalTabClass || ""} ${config.width > 750}`}
                  title={tabOption.title}
                >
                  <div >
                    <Content />
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </MainProfileStateContext.Provider>
    </div>
  );
}

export default UserProfile;
