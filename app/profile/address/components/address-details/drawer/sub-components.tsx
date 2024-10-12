import { TextInput } from "@/app/_custom-components";
import { Button } from "@nextui-org/react";
import { addressTypeList, drawerVal } from "../../../utils";
import { Fragment } from "react";
import { addressType } from "@/lib/profile/slices/address-slice";
import { multiplePathSetter, setKeyVal } from "@/app/_utils";
import { z } from "zod";

export const AddressType = ({
  config,
  setMultipleData,
  setData,
}: {
  config: drawerVal;
  setMultipleData: multiplePathSetter;
  setData: setKeyVal;
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
                  setMultipleData([
                    ["addressType", null],
                    ["otherAddress", ""],
                  ]);
                  return;
                }
                setData("addressType")(item.type);
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
            setData={setData("otherAddress")}
            placeholder="Save as"
            variant="underlined"
          />
        ) : null}
      </div>
    </>
  );
};
