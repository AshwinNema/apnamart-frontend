import CustomDrawer from "@/app/_custom-components/drawer";
import { useProfileSelector } from "@/lib/profile/hooks";
import { ModalBody } from "@nextui-org/react";
import { z } from "zod";
import { useEffect, useState } from "react";
import { addressDrawerDefaultVal } from "../../utils";
import { TextInput } from "@/app/_custom-components";
import { setNestedPath } from "@/app/_utils";
import { DrawerSaveBtn } from "./save-btn";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

export default function AddressDrawer({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const addressLine1 = useProfileSelector(
    (state) => state.merchantDetails.addressLine1,
  );
  const addressLine2 = useProfileSelector(
    (state) => state.merchantDetails.addressLine2,
  );
  const pinCode = useProfileSelector((state) => state.merchantDetails.pinCode);
  const [config, setConfig] = useState(addressDrawerDefaultVal());
  const setData = setNestedPath(setConfig);

  useEffect(() => {
    setConfig({
      addressLine1,
      addressLine2,
      pinCode,
    });
  }, [addressLine1, addressLine2, pinCode, isOpen]);

  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const inputProps = {
    isRequired: true,
    isReadOnly: registrationStatus === merchantRegistrationStatus.adminReview,
  };

  return (
    <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalBody>
        <div className="h-full relative flex items-center ">
          <div className="p-1 flex flex-col gap-6 w-full">
            <TextInput
              value={config.addressLine1}
              label="Shop No/Floor/Street Address"
              {...inputProps}
              setData={setData("addressLine1")}
            />
            <TextInput
              value={config.addressLine2}
              label="Area/ Colony/ State/ Province"
              {...inputProps}
              setData={setData("addressLine2")}
            />

            <TextInput
              value={config.pinCode}
              validationSchema={z.string().length(6, {
                message: "Pin code should be a six digit number",
              })}
              type="number"
              {...inputProps}
              label="Pin Code"
              setData={(value: string) => {
                if (value.length > 6) return;
                setData("pinCode")(value);
              }}
            />
            <DrawerSaveBtn config={config} onOpenChange={onOpenChange} />
          </div>
        </div>
      </ModalBody>
    </CustomDrawer>
  );
}
