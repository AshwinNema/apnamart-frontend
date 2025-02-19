import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, isMobileScreen } from "@/app/_utils";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { setMenuOptions } from "@/lib/main/slices/product-menu/product-menu.slice";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { Fragment, useCallback, useEffect, useState } from "react";
import styles from "@/app/styles.module.css";
import { Card, Skeleton } from "@heroui/react";
import { MenuItem } from "./menu-item";
import { usePathname } from "next/navigation";
import { produce } from "immer";
import { MobileMenu } from "./mobile-menu/mobile-menu";

export const CustomerMenu = () => {
  const user = useAppSelector((state) => state.user) as UserInterface | null;
  const { items: productMenu, isLoaded } = useAppSelector(
    (state) => state.productMenu,
  );
  const [config, setConfig] = useState({
    isMobile: false,
  });
  const menuLength = productMenu?.length || 0;
  const dispatch = useAppDispatch();
  const path = usePathname();

  const resizeCheck = useCallback(() => {
    setConfig(
      produce((draft) => {
        draft.isMobile = isMobileScreen();
      }),
    );
  }, []);

  useEffect(() => {
    resizeCheck();
    window.addEventListener("resize", resizeCheck);

    return () => {
      window.removeEventListener("resize", resizeCheck);
    };
  }, []);

  useEffect(() => {
    if ((user && user?.role !== UserRole.customer) || menuLength) return;
    makeDataRequest(HTTP_METHODS.GET, appEndPoints.CUSTOMER_MENU)
      .then((res) => {
        if (!res) return;
        dispatch(setMenuOptions({ isLoaded: true, items: res }));
      })
      .catch((err) => {
        dispatch(setMenuOptions({ isLoaded: true, items: [] }));
        console.log(err);
      });
  }, [user?.role, menuLength]);

  if (user && user?.role !== UserRole.customer) return null;
  if (
    path.startsWith("/checkout") ||
    path.startsWith("/cart") ||
    path.startsWith("/profile") ||
    path.startsWith("/payment-success")
  )
    return null;

  return (
    <>
      <Skeleton isLoaded={isLoaded}>
        <div className={`${!config.isMobile && "m-3"} flex justify-center`}>
          {!!productMenu.length ? (
            <Card
              radius={config.isMobile ? "none" : "lg"}
              className="p-5 overflow-visible"
            >
              {config.isMobile ? (
                <MobileMenu />
              ) : (
                <div className={`gap-3 ${styles["customer-menu-grid"]}`}>
                  {productMenu.map((details) => {
                    return (
                      <Fragment key={details.id}>
                        <MenuItem details={details} />
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </Card>
          ) : (
            <></>
          )}
        </div>
      </Skeleton>
    </>
  );
};
