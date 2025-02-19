import { Card } from "@heroui/react";
import { useProfileSelector } from "@/lib/profile/hooks";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setKeyVal, setNestedPath } from "@/app/_utils";
import RegistrationForm from "./registration-form";
import PendingAdminReview from "./pending-admin-review";
import MerchantAdminChatSupport from "../../_shared-Components/chat/merchant-admin-chat";
import { MainProfileStateContext } from "../utils";

interface merchantRegistrationState {
  showReviewDetails: boolean;
}
export const MainMerchantRegistrationContext = createContext<{
  config: merchantRegistrationState;
  setConfig: Dispatch<SetStateAction<merchantRegistrationState>>;
  setData: setKeyVal;
} | null>(null);

const MerchantRegistration = () => {
  const registrationStatus = useProfileSelector(
    (state) => state.merchantDetails.registrationStatus,
  );
  const registrationId = useProfileSelector(
    (state) => state.merchantDetails.id,
  );
  const maincontext = useContext(MainProfileStateContext);
  const [config, setConfig] = useState<merchantRegistrationState>({
    showReviewDetails: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    setData("showReviewDetails")(
      registrationStatus === merchantRegistrationStatus.adminReview,
    );
  }, [registrationStatus]);
  if (!maincontext) return null;
  return (
    <Card
      className="h-[80svh]"
      radius={`${maincontext.config.width > 750 ? "lg" : "none"}`}
      shadow={`${maincontext.config.width > 750 ? "md" : "none"}`}
    >
      {config.showReviewDetails ? (
        <>
          <PendingAdminReview setData={setData} />
        </>
      ) : (
        <MainMerchantRegistrationContext.Provider
          value={{
            config,
            setConfig,
            setData,
          }}
        >
          <RegistrationForm />
        </MainMerchantRegistrationContext.Provider>
      )}
      {registrationId && <MerchantAdminChatSupport />}
    </Card>
  );
};

export default MerchantRegistration;
