import { ComponentSkeleton, ProtectedRoute } from "@/app/_custom-components";
import { UserRole } from "@/lib/main/slices/user/user.slice";
import dynamic from "next/dynamic";

function Page() {
  const MainComponent = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
  });
  return (
    <ProtectedRoute allowedRole={UserRole.merchant}>
      <MainComponent />
    </ProtectedRoute>
  );
}

export default Page;
