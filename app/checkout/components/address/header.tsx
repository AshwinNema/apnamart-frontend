import React, { useContext } from "react";
import { AddressContext } from "../../helpers";
import { produce } from "immer";
import LocationAutoCompleteInput from "@/app/profile/shared-components/shared-map/auto-complete";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
export const Header = () => {
  const context = useContext(AddressContext);
  if (!context) return null;
  const { config, setConfig } = context;
  return (
    <>
      <div className="mb-5">
        <LocationAutoCompleteInput
          setLocation={(val, address) => {
            setConfig(
              produce((draft) => {
                draft.fly = true;
                draft.flyToLocation = val;
                draft.address = address;
              }),
            );
          }}
        />
      </div>

      <Skeleton isLoaded={config.isAddLoaded}>
        <Card className="my-3 min-h-20">
          <CardBody>
            <p>{config.address}</p>
          </CardBody>
        </Card>
      </Skeleton>
    </>
  );
};
