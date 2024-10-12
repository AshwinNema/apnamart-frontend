import { Card } from "@nextui-org/react";
import { useProfileSelector } from "@/lib/profile/hooks";
import { merchantRegistrationStatus } from "@/lib/main/slices/user/user.slice";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { setKeyVal, setNestedPath } from "@/app/_utils";
import RegistrationForm from "./registration-form";
import PendingAdminReview from "./pending-admin-review";
import MerchantAdminChatSupport from "../../_shared_Components/chat/merchant-admin-chat";

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
  const [config, setConfig] = useState<merchantRegistrationState>({
    showReviewDetails: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    setData("showReviewDetails")(
      registrationStatus === merchantRegistrationStatus.adminReview,
    );
  }, [registrationStatus]);

  return (
    <Card className="h-[80svh]">
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
