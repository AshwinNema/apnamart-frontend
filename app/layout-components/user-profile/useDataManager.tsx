import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { handleAction } from "../notifications/logout";
import { commonRoleRoutes, routes } from "../../_utils";
import {
  eventEmitterSubject,
  loaderEvents,
  useEventLoaderEmitter,
} from "../../_custom-components";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { Subject } from "rxjs";

export enum dropDownItemKeys {
  signIn = "Signed as",
  updateProfile = "Update Profile",
  orders = "orders",
  logout = "Logout",
}

const useDataManager = (): [
  UserInterface,
  (key: string | number) => void,
  Subject<eventEmitterSubject>,
] => {
  const user = useAppSelector((state) => state.user);
  const emitter = useEventLoaderEmitter();

  const dispatch = useAppDispatch();

  const optionSelect = (key: string | number) => {
    switch (key) {
      case dropDownItemKeys.updateProfile:
        emitter.next({
          type: loaderEvents.routeNavigation,
          route: commonRoleRoutes.profile,
        });
        break;
      case dropDownItemKeys.orders:
        emitter.next({
          type: loaderEvents.routeNavigation,
          route: routes.customer.orders,
        });
        break;
      case dropDownItemKeys.logout:
        dispatch(handleAction());
        break;
      default:
        break;
    }
  };

  return [user, optionSelect, emitter];
};

export default useDataManager;
