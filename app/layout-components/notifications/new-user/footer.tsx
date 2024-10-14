import { useAppSelector } from "@/lib/main/hooks";
import { Link, ModalFooter } from "@nextui-org/react";
import { details } from ".";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { useEffect, useState } from "react";
import { tabKeys } from "@/lib/profile/slices/component-state.slice";
import { FooterElementWrapper, footerWrapperType } from "./sub-compoents";
import { usePathname } from "next/navigation";
import { Spinner } from "@/app/_custom-components";
import { commonRoleRoutes } from "@/app/_utils";

const Footer = ({ onClose }: { onClose: () => void }) => {
  const notificationDetails = useAppSelector(
    (state) => state.notifications.details,
  ) as details;
  const [showSpinner, setShowSpinner] = useState(false);
  const [count, setCount] = useState(0);
  const path = usePathname();

  useEffect(() => {
    let curCount = 0;
    if (notificationDetails?.noInitialPassword) curCount += 1;
    if (notificationDetails?.role === UserRole.merchant) curCount += 1;
    setCount(curCount);
  }, [notificationDetails?.noInitialPassword, notificationDetails?.role]);

  useEffect(() => {
    setShowSpinner(false);
  }, [path]);

  const closeLink = () => {
    if (count <= 1) {
      setShowSpinner(true);
      onClose();
    }
  };

  return (
    <>
      {count > 0 ? (
        <ModalFooter>
          <p className="italic">
            <span className="font-bold">Please note :</span>
            <FooterElementWrapper
              type={footerWrapperType.container}
              count={count}
            >
              {notificationDetails?.role === UserRole.merchant ? (
                <FooterElementWrapper
                  type={footerWrapperType.element}
                  count={count}
                >
                  To complete your registration, please{" "}
                  <Link
                    isExternal={count > 1}
                    onClick={closeLink}
                    href={`${commonRoleRoutes.profile}?selectedTab=${tabKeys.merchantRegistration}`}
                  >
                    click here
                  </Link>
                </FooterElementWrapper>
              ) : (
                <></>
              )}

              {notificationDetails?.noInitialPassword ? (
                <FooterElementWrapper
                  type={footerWrapperType.element}
                  count={count}
                >
                  Your inital password is not set, hence you will not be able to
                  sign in using password. You can set it by{" "}
                  <Link
                    isExternal={count > 1}
                    onClick={closeLink}
                    href={`${commonRoleRoutes.profile}?selectedTab=${tabKeys.settings}`}
                  >
                    clicking here
                  </Link>
                </FooterElementWrapper>
              ) : (
                <></>
              )}
            </FooterElementWrapper>
          </p>
        </ModalFooter>
      ) : null}

      {showSpinner && <Spinner />}
    </>
  );
};

export default Footer;
