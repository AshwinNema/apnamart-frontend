import React, { useEffect } from "react";
import { Badge, NavbarItem } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { FaCartShopping } from "react-icons/fa6";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import {
  setCartCount,
  setCartCountLoaded,
  clearCartCount,
} from "@/lib/main/slices/cart-count/cart-count.slice";
import useEventLoaderEmitter from "@/app/_custom-components/loaders/event-loader/useEventLoaderEmitter";
import { EventLoader, loaderEvents } from "@/app/_custom-components";
import { usePathname } from "next/navigation";

export const UserShoppingCart = () => {
  const user = useAppSelector((state) => state.user);
  const path = usePathname();
  const cartCount = useAppSelector((state) => state.cartCount.count);
  const cartCountLoaded = useAppSelector((state) => state.cartCount.isFetched);
  const eventEmitter = useEventLoaderEmitter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.role !== UserRole.customer) {
      dispatch(clearCartCount());
      return;
    }
    if (cartCountLoaded && !path.startsWith("/payment-success")) return;
    makeDataRequest(
      HTTP_METHODS.GET,
      appEndPoints.CART_ITEM_COUNT,
      undefined,
      undefined,
      { showLoader: false },
    )
      .then((res) => {
        dispatch(setCartCount(typeof res === "number" ? res : 0));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setCartCountLoaded());
      });
  }, [user, dispatch, path, cartCountLoaded]);

  return (
    <>
      {user?.role === UserRole.customer && (
        <NavbarItem>
          <Badge
            isInvisible={cartCount === 0}
            className="scale-[0.8] mb-5"
            showOutline={false}
            color="danger"
            content={cartCount}
          >
            <div className="pt-1 mb-2">
              <FaCartShopping
                onClick={() => {
                  eventEmitter.next({
                    type: loaderEvents.routeNavigation,
                    route: "/cart",
                  });
                }}
                className="scale-[1.5] cursor-pointer"
              />
            </div>
          </Badge>
          <EventLoader emitter={eventEmitter} />
        </NavbarItem>
      )}
    </>
  );
};
