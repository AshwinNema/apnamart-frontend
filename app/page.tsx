"use client";

import { useAppSelector } from "@/lib/main/hooks";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import dynamic from "next/dynamic";
import { ComponentSkeleton } from "./_custom-components";

export default function Home() {
  const role = useAppSelector((state) => state.user?.role);

  const EntityDashboard = dynamic(() => import("./main-page"), {
    loading: () => <ComponentSkeleton />,
  });

  return (
    <div>
      {role && role !== UserRole.customer && (
        <EntityDashboard entityKey={role} />
      )}
    </div>
  );
}
