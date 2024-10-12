import { getTabOptions, mainProfileState, tabOption } from "./utils";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { useProfileDispatch, useProfileSelector } from "@/lib/profile/hooks";
import { setTab, tabKeys } from "@/lib/profile/slices/component-state.slice";
import * as _ from "lodash";
import { setUserDetails } from "@/lib/profile/slices/main-user-details.slice";
import { setAddressDetails } from "@/lib/profile/slices/address-slice";
import { getLocalStorageKey, storageAttributes } from "../_services";
import { setProfileUser } from "@/lib/profile/slices/user.slice";
import {
  merchantRegistrationDetails,
  setMerchantDetails,
} from "@/lib/profile/slices/merchant-details.slice";
import { stepList as merchantRegistrationStepList } from "./merchant-registration/registration-form/utils";

const useMainState = (): [
  tabOption[],
  mainProfileState,
  Dispatch<SetStateAction<mainProfileState>>,
] => {
  const user = useProfileSelector((state) => state.user);
  const [config, setConfig] = useState<mainProfileState>({
    businessRegistrationFile: null,
  });
  const dispatch = useProfileDispatch();
  const params = useSearchParams();
  const selectedTab = params.get("selectedTab");
  const isSelectedTabLoaded = useRef(false);
  const tabOptions = useMemo(() => getTabOptions(user), [user]);

  useEffect(() => {
    const localStorageUser = getLocalStorageKey(storageAttributes.user);
    if (!user && localStorageUser) {
      dispatch(setProfileUser(localStorageUser));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const details = _.pick(user || {}, ["name", "email"]);
    dispatch(setUserDetails(details));
  }, [user, dispatch]);

  useEffect(() => {
    const details = _.pick(user?.address || {}, [
      "latitude",
      "longtitude",
      "addressLine1",
      "addressLine2",
      "addressType",
      "otherAddress",
    ]);
    dispatch(setAddressDetails(details));
  }, [user?.address, dispatch]);

  useEffect(() => {
    if (isSelectedTabLoaded.current) return;
    isSelectedTabLoaded.current = true;
    selectedTab &&
      selectedTab !== tabKeys.profile &&
      tabOptions.find((item) => item.key === selectedTab) &&
      dispatch(setTab(selectedTab));
  }, [selectedTab, tabOptions, dispatch]);

  useEffect(() => {
    const details: Partial<merchantRegistrationDetails> = _.pick(
      user?.merchantDetails || {},
      [
        "id",
        "name",
        "description",
        "isMerchantBlocked",
        "registrationStatus",
        "latitude",
        "longtitude",
        "addressLine1",
        "addressLine2",
        "bankAcNo",
        "gstIn",
        "panCard",
        "pinCode",
        "photo",
      ],
    );
    if (user?.merchantDetails?.photo) {
      details.showImage = true;
    }
    if (user?.merchantDetails)
      details.totalCompletedSteps = merchantRegistrationStepList.length;
    dispatch(setMerchantDetails(details));
  }, [user?.merchantDetails, dispatch]);

  return [tabOptions, config, setConfig];
};

export default useMainState;
