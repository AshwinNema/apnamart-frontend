import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { useAppDispatch, useAppSelector } from "@/lib/main/hooks";
import { setMenuOptions } from "@/lib/main/slices/product-menu/product-menu.slice";
import { UserInterface, UserRole } from "@/lib/main/slices/user/user.slice";
import { Fragment, useEffect } from "react";
import styles from "@/app/styles.module.css";
import { Card } from "@nextui-org/react";
import { MenuItem } from "./menu-item";
import { usePathname } from "next/navigation";

export const CustomerMenu = () => {
  const user = useAppSelector((state) => state.user) as UserInterface | null;
  const productMenu = useAppSelector((state) => state.productMenu);
  const menuLength = productMenu?.length || 0;
  const dispatch = useAppDispatch();
  const path = usePathname();

  useEffect(() => {
    if ((user && user?.role !== UserRole.customer) || menuLength) return;
    makeDataRequest(HTTP_METHODS.GET, appEndPoints.CUSTOMER_MENU)
      .then((res) => {
        if (!res) return

        dispatch(setMenuOptions(res));
      })
      .catch((err) => {
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
      <div className="m-3 flex justify-center">
        {!!productMenu.length ? (
          <Card className="p-5 overflow-visible">
            <div className={`gap-3 ${styles["customer-menu-grid"]}`}>
              {productMenu.map((details) => {
                return (
                  <Fragment key={details.id}>
                    <MenuItem details={details} />
                  </Fragment>
                );
              })}
            </div>
          </Card>
        ) : (
          <Card className="hidden"></Card>
        )}
      </div>
    </>
  );
};
