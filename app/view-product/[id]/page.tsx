import dynamic from "next/dynamic";

export default function Page() {
  const MainComponent = dynamic(() => import("./main"), {});
  return <MainComponent />;
}
