import { useContext } from "react";
import { MainContext } from "../helpers";
import { Button } from "@nextui-org/react";
import { setNestedPath } from "@/app/_utils";

export const MainLandingPage = () => {
  const mainState = useContext(MainContext);
  if (mainState?.config?.currentState !== "main screen") return null;
  return (
    <>
      <div className="flex justify-end mr-5">
        <Button
          onPress={() => {
            setNestedPath(mainState.setConfig)("currentState")("create");
          }}
          color="primary"
        >
          Create Product
        </Button>
      </div>
    </>
  );
};
