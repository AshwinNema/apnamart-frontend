"use client";
import { ComponentSkeleton, ProtectedRoute } from "@/app/_custom-components";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import dynamic from "next/dynamic";

export default function Page() {
  const MainComponent = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
  });

  return (
    <ProtectedRoute allowedRole={UserRole.admin}>
      <MainComponent />
    </ProtectedRoute>
  );
}
