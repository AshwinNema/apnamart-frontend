import { TextInput } from "@/app/_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { Button, Drawer, DrawerBody, DrawerContent } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { drawerVal, saveDrawerDetails } from "../../../utils";
import { drawerInitialVal } from "../../../utils";
import { IoSaveSharp } from "react-icons/io5";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { AddressType } from "./sub-components";

export default function AddressDetailsDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const addressDetails = useProfileSelector((state) => state.addressDetails);
  const [config, setConfig] = useState<drawerVal>(
    structuredClone(drawerInitialVal),
  );
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const dispatch = useProfileDispatch();
  useEffect(() => {
    setConfig(structuredClone(addressDetails));
  }, [addressDetails, isOpen]);

  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
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
                <div>
                  <AddressType
                    config={config}
                    setMultipleData={setMultipleData}
                    setData={setData}
                  />
                  <Button
                    className="mt-3"
                    startContent={<IoSaveSharp />}
                    onPress={() =>
                      saveDrawerDetails(config, onOpenChange, dispatch)
                    }
                    color="primary"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
