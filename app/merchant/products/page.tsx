"use client";
import { ComponentSkeleton, ProtectedRoute } from "@/app/_custom-components";
import {
  merchantRegistrationStatus,
  UserRole,
} from "@/lib/main/slices/user/user.slice";
import dynamic from "next/dynamic";
import {
  getLocalStorageKey,
  getSessionStorageKey,
  sessionStorageAttributes,
  storageAttributes,
} from "@/app/_services";
import { UserInterface } from "@/lib/main/slices/user/user.slice";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FcViewDetails } from "react-icons/fc";

import { FaComputer } from "react-icons/fa6";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/main/hooks";
import { getUserProfile } from "@/app/profile/api";
function Page() {
  const dispatch = useAppDispatch();
  const MainComponent = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
  });

  useEffect(() => {
    const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
    const isUserFetched = getSessionStorageKey(
      sessionStorageAttributes.userFetch,
    );
    const incompleteRegistration =
      !user?.merchantDetails ||
      user?.merchantDetails?.registrationStatus ===
        merchantRegistrationStatus.adminReview;
    if ((!isUserFetched && user) || incompleteRegistration) {
      getUserProfile(dispatch, user?.role === UserRole.merchant);
    }
  }, [dispatch]);

  const user = getLocalStorageKey(storageAttributes.user) as UserInterface;
  const incompleteRegistration =
    !user?.merchantDetails ||
    user?.merchantDetails?.registrationStatus ===
      merchantRegistrationStatus.adminReview;
  return (
    <ProtectedRoute allowedRole={UserRole.merchant}>
      {incompleteRegistration ? (
        <div className="relative h-[100svh] flex items-center justify-center">
          <Card isBlurred={true} className="min-h-[30svh] p-3 m-3">
            <CardBody className={`flex items-center flex-row`}>
              <div className="w-full">
                <div className="flex justify-center mb-12 w-full mt-5">
                  <FaComputer className="scale-[7]" />
                </div>
                <div className="flex  items-center gap-10 text-lg ml-3">
                  <div>
                    <BiSolidErrorCircle className="fill-dangerTheme scale-[3] " />
                  </div>

                  <span className="inline-block align-middle break-all">
                    <span className="inline-block align-middle">
                      Please complete your registration process
                    </span>
                    <span className="ml-3 mr-2 inline-block align-middle">
                      <FcViewDetails className="scale-[3] " />
                    </span>{" "}
                    <span className="inline-block align-middle">
                      first. You will be allowed to create products after your
                      registration is approved by one of our admins.{" "}
                    </span>
                  </span>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="text-lg font-bold"></div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <MainComponent />
      )}
    </ProtectedRoute>
  );
}

export default Page;
