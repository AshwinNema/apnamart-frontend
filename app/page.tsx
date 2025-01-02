"use client";

import { useAppSelector } from "@/lib/main/hooks";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import dynamic from "next/dynamic";
import { ComponentSkeleton } from "./_custom-components";

export default function Home() {
  const role = useAppSelector((state) => state.user?.role);
  const showEntityDashboard = role && role !== UserRole.customer;
  const EntityDashboard = dynamic(
    () => import("./main-page").then((mod) => mod.EntityDashboard),
    {
      loading: () => <ComponentSkeleton />,
    },
  );

  const CategoryLists = dynamic(
    () => import("./main-page").then((mod) => mod.CategoryList),
    {
      loading: () => <ComponentSkeleton />,
    },
  );

  return (
    <div>
      {showEntityDashboard ? (
        <EntityDashboard entityKey={role} />
      ) : (
        <CategoryLists />
      )}
    </div>
  );
}
