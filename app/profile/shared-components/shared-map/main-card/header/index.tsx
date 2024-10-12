import { CardHeader } from "@nextui-org/react";
import { componentTypes } from "../../interfaces & enums";
import { IoLocation } from "react-icons/io5";
import { LocationButton } from "./sub-components";
import { useContext } from "react";
import { MainCardContext } from "..";
import MerchantRegistrationAddressDetails from "@/app/profile/merchant-registration/registration-form/pickup-address/details";
import { SaveDetailsIcon } from "@/app/profile/merchant-registration/registration-form/sub-components";

export default function Header() {
  const context = useContext(MainCardContext);
  if (context == null) return null;
  const { componentType } = context;
  return (
    <CardHeader className="flex flex-col">
      <div className="font-bold flex justify-center text-2xl items-center">
        <IoLocation /> Select{" "}
        {componentType === componentTypes.profileAddress
          ? "your location"
          : "PickUp Location"}
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          {componentType === componentTypes.merchantRegistration ? (
            <>
              <LocationButton />
              <MerchantRegistrationAddressDetails />
            </>
          ) : null}
        </div>
        {componentType === componentTypes.merchantRegistration ? (
          <SaveDetailsIcon />
        ) : (
          <LocationButton />
        )}
      </div>
    </CardHeader>
  );
}
