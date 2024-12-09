import { TextInput } from "@/app/_custom-components";
import { Button } from "@nextui-org/react";
import { Fragment } from "react";
import { addressType } from "@/lib/profile/slices/address-slice";
import { z } from "zod";
import { addressDrawerConfig, setAddressDrawerConfig } from "../../helpers";
import { addressTypeList } from "@/app/profile/address/utils";
import { produce } from "immer";

export const AddressType = ({
  config,
  setConfig,
}: {
  config: addressDrawerConfig;
  setConfig: setAddressDrawerConfig;
}) => {
  return (
    <>
      Type of address :
      <div className="flex gap-3 mt-3">
        {addressTypeList.map((item) => {
          if (
            config.addressType === addressType.others &&
            item.type !== addressType.others
          ) {
            return <Fragment key={item.type} />;
          }
          return (
            <Button
              color="primary"
              variant={item.type === config.addressType ? "flat" : "faded"}
              onPress={() => {
                if (config.addressType === addressType.others) {
                  setConfig(
                    produce((draft) => {
                      draft.otherAddress = "";
                      draft.addressType = null;
                    }),
                  );
                  return;
                }
                setConfig(
                  produce((draft) => {
                    draft.addressType = item.type;
                  }),
                );
              }}
              startContent={item.icon}
              key={item.type}
            >
              {item.label}
            </Button>
          );
        })}
        {config.addressType === addressType.others ? (
          <TextInput
            value={config.otherAddress}
            validationSchema={z.string()}
            setData={(val) => {
              setConfig(
                produce((draft) => {
                  draft.otherAddress = val;
                }),
              );
            }}
            placeholder="Save as"
            variant="underlined"
          />
        ) : null}
      </div>
    </>
  );
};
