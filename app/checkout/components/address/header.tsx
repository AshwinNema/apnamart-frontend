import React, { useContext } from "react";
import { AddressContext } from "../../helpers";
import { produce } from "immer";
import LocationAutoCompleteInput from "@/app/profile/shared-components/shared-map/auto-complete";
import { BiSolidEditLocation } from "react-icons/bi";
import {
  Card,
  CardBody,
  Skeleton,
  Button,
  useDisclosure,
} from "@heroui/react";
import { AddressDetailsDrawer } from "./address-drawer";
export const Header = () => {
  const context = useContext(AddressContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (!context) return null;
  const { config, setConfig } = context;
  return (
    <>
      <div className="mb-5 mbStart:flex-col flex items-center gap-5">
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
        <div className="flex justify-end mbStart:w-full">
          <Button
            variant="ghost"
            onClick={onOpen}
            endContent={<BiSolidEditLocation />}
            className="cursor-pointer p-3 break-all min-w-[12rem]"
            color="primary"
            size="sm"
          >
            View/Update location details
          </Button>
        </div>
      </div>

      <Skeleton isLoaded={config.isAddLoaded}>
        <Card className="my-3 min-h-20">
          <CardBody>
            <p>{config.address}</p>
          </CardBody>
        </Card>
        <AddressDetailsDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
      </Skeleton>
    </>
  );
};
