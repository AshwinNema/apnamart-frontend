import { TextInput } from "@/app/_custom-components";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setMerchantDetails } from "@/lib/profile/slices/merchant-details.slice";
import { MdAccountBalance } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoCardSharp } from "react-icons/io5";
import { textInputProps } from "./utils";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import { useMemo } from "react";
export const BankAndTaxDetails = () => {
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const bankAcNo = useProfileSelector(
    (state) => state.merchantDetails.bankAcNo,
  );
  const gstIn = useProfileSelector((state) => state.merchantDetails.gstIn);
  const panCard = useProfileSelector((state) => state.merchantDetails.panCard);
  const dispatch = useProfileDispatch();
  const setData = (key: string) => (value: string) => {
    dispatch(setMerchantDetails({ [key]: value }));
  };

  const inputProps = useMemo(() => {
    return {
      isReadOnly: merchantRegistrationStatus.adminReview === registrationStatus,
      ...textInputProps,
    };
  }, [registrationStatus]);
  return (
    <div className="m-3 min-h-[40dvh]">
      <TextInput
        value={bankAcNo}
        setData={setData("bankAcNo")}
        Icon={() => <MdAccountBalance />}
        label="Bank A/C No."
        {...inputProps}
      />

      <TextInput
        value={gstIn}
        setData={setData("gstIn")}
        Icon={() => <FaFileInvoiceDollar />}
        label="GSTIN"
        {...inputProps}
      />

      <TextInput
        value={panCard}
        setData={setData("panCard")}
        Icon={() => <IoCardSharp />}
        label="PAN Card"
        {...inputProps}
      />
    </div>
  );
};
