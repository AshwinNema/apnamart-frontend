import dynamic from "next/dynamic";
import { ComponentSkeleton, ProtectedRoute } from "../_custom-components";
import { UserRole } from "@/lib/main/slices/user/user.slice";

const Page = () => {
    const Orders = dynamic(() => import("./main"), {
        loading: () => <ComponentSkeleton />,
        ssr: false,
      });

      return <>
      <ProtectedRoute allowedRole={UserRole.customer}>
        <Orders />
      </ProtectedRoute>
      </>
}

export default Page;