import { useContext } from "react";
import { MainCardContext } from "..";
import { Button } from "@nextui-org/react";
import { getUserLocation } from "../..";
import { FaLocationArrow } from "react-icons/fa";

export const LocationButton = () => {
  const context = useContext(MainCardContext);
  if (!context) return null;
  const { setMultipleData } = context;

  return (
    <Button
      onClick={() => {
        getUserLocation((val: [number, number]) => {
          setMultipleData([
            ["fly", true],
            ["flyToLocation", val],
          ]);
        });
      }}
      endContent={<FaLocationArrow />}
      className="cursor-pointer p-3"
      color="primary"
      size="sm"
    >
      Go to your location
    </Button>
  );
};
