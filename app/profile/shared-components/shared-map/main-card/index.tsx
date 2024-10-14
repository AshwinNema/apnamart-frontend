import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { MainCardContextState, MainCardProps } from "../interfaces & enums";
import LocationAutoCompleteInput from "../auto-complete";
import Header from "./header";
import { createContext } from "react";

export const MainCardContext = createContext<MainCardContextState | null>(null);

export default function MainCardComponent({
  setMultipleData,
  config,
  componentType,
}: MainCardProps) {
  return (
    <>
      <MainCardContext.Provider value={{ setMultipleData, componentType }}>
        <Header />
      </MainCardContext.Provider>

      <div className="m-2">
        <LocationAutoCompleteInput
          setLocation={(val, address) => {
            setMultipleData([
              ["fly", true],
              ["flyToLocation", val],
              ["address", address],
            ]);
          }}
        />
        <Skeleton isLoaded={config.isAddLoaded}>
          <Card className="my-3 min-h-20">
            <CardBody>
              <p>{config.address}</p>
            </CardBody>
          </Card>
        </Skeleton>
      </div>
    </>
  );
}
