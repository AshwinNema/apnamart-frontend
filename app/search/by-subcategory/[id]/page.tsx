import { ComponentSkeleton } from "@/app/_custom-components";
import dynamic from "next/dynamic";

export default function Page() {
  const ProductSearch = dynamic(() => import("../../_search_component"), {
    loading: () => <ComponentSkeleton />,
  });
  return (
    <>
      <ProductSearch type="sub category" />
    </>
  );
}
