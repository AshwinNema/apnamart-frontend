import { useProfileSelector } from "@/lib/profile/hooks";
import { SiGooglemybusiness } from "react-icons/si";
import { stepperLastBtnText } from "../../../stepper";

export const getSavingInfoContent = (merchantId?: number) => {
  return (
    <>
      <span className="font-bold">{stepperLastBtnText(merchantId)}</span> button
      or click on{" "}
      <SiGooglemybusiness className="inline-block align-middle mx-2 scale-[1.3] fill-[black]" />
      icon on the top right to{" "}
      {merchantId ? "update details" : "complete your registration"}
    </>
  );
};

export const SuccessToolTipContent = () => {
  const merchantId = useProfileSelector((state) => state.merchantDetails.id);
  return (
    <div className="align-middle inline-block">
      Click below on <span className="font-bold">Save</span> button to save the
      details. If you have not selected your location on the map, then please
      select it and then click on {getSavingInfoContent(merchantId)}
    </div>
  );
};

export const DrawerSaveBtnInfo = () => {
  const merchantId = useProfileSelector((state) => state.merchantDetails.id);
  return (
    <div className="align-middle inline-block">
      Please click on {getSavingInfoContent(merchantId)}
    </div>
  );
};
