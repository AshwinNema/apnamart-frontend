import { useDispatch, useSelector, useStore } from "react-redux";
import { ProfileDispatch, ProfileStore, RootState } from "./store";

export const useProfileDispatch = useDispatch.withTypes<ProfileDispatch>();
export const useProfileSelector = useSelector.withTypes<RootState>();
export const useProfileStore = useStore.withTypes<ProfileStore>();
