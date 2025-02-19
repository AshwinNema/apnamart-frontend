import {
  getTabOptions,
  mainProfileState,
  setUserStateDetails,
  tabOption,
} from "./utils";
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
import { produce } from "immer";

const useMainState = (): [
  tabOption[],
  mainProfileState,
  Dispatch<SetStateAction<mainProfileState>>,
] => {
  const user = useProfileSelector((state) => state.user);
  const [config, setConfig] = useState<mainProfileState>({
    businessRegistrationFile: null,
    width: window.innerWidth,
  });
  const dispatch = useProfileDispatch();
  const params = useSearchParams();
  const selectedTab = params.get("selectedTab");
  const isSelectedTabLoaded = useRef(false);
  const tabOptions = useMemo(() => getTabOptions(user), [user?.role]);

  useEffect(() => {
    const localStorageUser = getLocalStorageKey(storageAttributes.user);
    if (localStorageUser) {
      dispatch(setProfileUser(localStorageUser));
    }
  }, [dispatch]);

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
    setUserStateDetails(user, dispatch);
  }, [user?.merchantDetails, dispatch]);

  useEffect(() => {
    const setWidth = () => {
      setConfig(
        produce((draft) => {
          draft.width = window.innerWidth;
        }),
      );
    };
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);
  return [tabOptions, config, setConfig];
};

export default useMainState;
