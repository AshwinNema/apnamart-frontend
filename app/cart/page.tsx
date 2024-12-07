import { UserRole } from "@/lib/main/slices/user/user.slice";
import { ComponentSkeleton, ProtectedRoute } from "../_custom-components";
import dynamic from "next/dynamic";

function Page() {
  const MainComponent = dynamic(() => import("./main"), {
    loading: () => <ComponentSkeleton />,
  });
  return (
    <ProtectedRoute allowedRole={UserRole.customer}>
      <MainComponent />
    </ProtectedRoute>
  );
}

export default Page;
