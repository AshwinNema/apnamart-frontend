import { useCallback, useContext, useEffect, useState } from "react";
import {
  AddressContext,
  addressDrawerConfig,
  getDefaultAddressDrawerConfig,
  saveAddressDrawerVals,
} from "../../helpers";
import { Button, Drawer, DrawerBody, DrawerContent } from "@nextui-org/react";
import { TextInput } from "@/app/_custom-components";
import { z } from "zod";
import { setNestedPath } from "@/app/_utils";
import { IoSaveSharp } from "react-icons/io5";
import { AddressType } from "./address-type";
import { produce } from "immer";

export const AddressDetailsDrawer = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const context = useContext(AddressContext);
  const [config, setConfig] = useState<addressDrawerConfig>(
    getDefaultAddressDrawerConfig(),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    if (!context?.config || isOpen) return;
    const {
      config: { details },
    } = context;

    setConfig(
      produce((draft) => {
        draft.addressLine1 = details.addressLine1;
        draft.addressLine2 = details.addressLine2;
        draft.addressType = details.addressType;
        draft.otherAddress = details.otherAddress;
      }),
    );
  }, [context?.config, isOpen]);
  if (!context) return null;
  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => {
            return (
              <>
                <DrawerBody>
                  <div className="h-full relative flex items-center ">
                    <div className="p-1 flex flex-col gap-6 w-full">
                      <TextInput
                        value={config.addressLine1}
                        validationSchema={z.string()}
                        className="w-full"
                        setData={setData("addressLine1")}
                        variant="flat"
                        label="Flat No./ House No./Floor/ Building"
                      />
                      <TextInput
                        value={config.addressLine2}
                        validationSchema={z.string()}
                        setData={setData("addressLine2")}
                        variant="flat"
                        label="Road Name/ Area/ Colony"
                      />
                      <AddressType config={config} setConfig={setConfig} />
                      <div>
                        <Button
                          className="mt-3"
                          startContent={<IoSaveSharp />}
                          onPress={() => {
                            saveAddressDrawerVals(
                              config,
                              context.setConfig,
                              onClose,
                            );
                          }}
                          color="primary"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </DrawerBody>
              </>
            );
          }}
        </DrawerContent>
      </Drawer>
    </>
  );
};
