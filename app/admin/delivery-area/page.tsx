"use client";
import { ProtectedRoute, Spinner } from "@/app/_custom-components";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useState } from "react";
import { produce } from "immer";

export default function Page() {
  const { theme } = useTheme();
  const [config, setConfig] = useState({
    isLoaded: false,
  });
  const DeliveryAddress = dynamic(
    () => import("@/app/admin/delivery-area/delivery-map"),
    {
      ssr: false,
      loading: () => <Spinner />,
    },
  );
  return (
    <>
      <ProtectedRoute allowedRole={UserRole.admin}>
        <Skeleton isLoaded={config.isLoaded} className="h-[100svh]">
          <Card
            shadow={`${theme === browserTheme.dark ? "lg" : "none"}`}
            className={`${theme === browserTheme.dark && "border-none"} m-5`}
          >
            <CardHeader className="flex justify-center text-2xl font-bold">
              Delivery Area
            </CardHeader>
            <CardBody>
              <DeliveryAddress
                onLoadComplete={() => {
                  setConfig(
                    produce(config, (draft) => {
                      draft.isLoaded = true;
                    }),
                  );
                }}
              />
            </CardBody>
          </Card>
        </Skeleton>
      </ProtectedRoute>
    </>
  );
}
