import { TextInput } from "@/app/_custom-components";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import MerchantLogo from "./merchant-logo";
import { SiNamesilo } from "react-icons/si";
import { textInputProps } from "../utils";
import { Textarea } from "@nextui-org/react";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";

const BusinessOverview = () => {
  const dispatch = useProfileDispatch();
  const name = useProfileSelector((state) => state.merchantDetails.name);
  const description = useProfileSelector(
    (state) => state.merchantDetails.description,
  );
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );

  const setData = (key: string) => (value: any) => {
    dispatch(
      setMerchantDetails({
        [key]: value,
      }),
    );
  };
  const readOnlyInputs =
    registrationStatus === merchantRegistrationStatus.adminReview;
  return (
    <>
      <MerchantLogo />

      <TextInput
        value={name}
        setData={setData("name")}
        Icon={() => <SiNamesilo />}
        label="Business Name"
        isReadOnly={readOnlyInputs}
        {...{
          ...textInputProps,
          classNames: {
            ...textInputProps.classNames,
            base: [textInputProps.classNames?.base, "mt-5"],
          },
        }}
      />

      <Textarea
        label="Business Description"
        value={description}
        isReadOnly={readOnlyInputs}
        onValueChange={setData("description")}
        {...textInputProps}
      />
    </>
  );
};

export default BusinessOverview;
