"use client";
import { ProtectedRoute, Spinner } from "@/app/_custom-components";
import { browserTheme } from "@/app/layout-components/theme-switch";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

export default function Page() {
  const { theme } = useTheme();
  const DeliveryAddress = dynamic(
    () => import("@/app/admin/delivery-area/delivery-area"),
    {
      ssr: false,
      loading: () => <Spinner />,
    },
  );
  return (
    <>
      <ProtectedRoute allowedRole={UserRole.admin}>
        <Card
          shadow={`${theme === browserTheme.dark ? "lg" : "none"}`}
          className={`${theme === browserTheme.dark && "border-none"} m-5`}
        >
          <CardHeader className="flex justify-center text-2xl font-bold">
            Delivery Area
          </CardHeader>
          <CardBody>
            <DeliveryAddress />
          </CardBody>
        </Card>
      </ProtectedRoute>
    </>
  );
}
