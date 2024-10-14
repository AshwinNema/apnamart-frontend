import { IconInput } from "../_custom-components";
import { Tabs, Tab, Badge, Avatar } from "@nextui-org/react";
import { MainProfileStateContext, tabOption } from "./utils";
import { BsPlusCircleFill } from "react-icons/bs";
import { uploadProfileImage } from "./api";
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
    <div className="mt-11">
      <div className="flex ml-11 mb-11">
        <Badge
          className="bg-[transparent] border-0 cursor-pointer"
          shape="circle"
          content={
            <>
              <IconInput
                Icon={BsPlusCircleFill}
                accept="image/png, image/jpeg"
                props={{
                  className:
                    "scale-[2] relative left-[1rem] bottom-[-1.5rem] cursor-pointer",
                }}
                callback={(file) => uploadProfileImage(file, dispatch)}
              />
            </>
          }
          placement="bottom-right"
        >
          <Avatar
            radius="full"
            size="lg"
            className="scale-[2]"
            src={`${user?.photo || ""}`}
          />
        </Badge>
      </div>

      <MainProfileStateContext.Provider
        value={{
          config,
          setConfig,
        }}
      >
        <div>
          <Tabs
            color="primary"
            variant="bordered"
            aria-label="Options"
            placement="start"
            className=""
            size="lg"
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
                  className={`min-h-16 w-full ${tabOption.additionalTabClass || ""}`}
                  title={tabOption.title}
                >
                  <div className="-mt-[8rem]">
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
