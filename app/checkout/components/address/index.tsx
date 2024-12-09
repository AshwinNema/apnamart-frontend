import { MainMap } from "@/app/_custom-components/leaflet/map-component";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useContext, useMemo } from "react";
import * as _ from "lodash";
import { AddressContext, MainContext } from "../../helpers";
import { LocationMarker } from "./marker";
import { AddressFooter } from "./address-footer";
import { Header } from "./header";
import useConfigManager from "./useConfigManager";
import { produce } from "immer";

export const Address = () => {
  const [config, setConfig] = useConfigManager();

  const displayMap = useMemo(
    () => (
      <MainMap
        className="h-[40svh] min-h-[250px]"
        center={[config.details.latitude, config.details.longtitude]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <LocationMarker config={config} setConfig={setConfig} />
      </MainMap>
    ),
    [config.details.latitude, config.details.longtitude, config.flyToLocation],
  );

  const context = useContext(MainContext);
  if (!context) return null;
  const addressDetails = context.config.address;
  return (
    <Accordion selectedKeys={config.accordionVal}>
      <AccordionItem
        key={"1"}
        classNames={{
          title: "text-white ml-5",
          subtitle: "text-white ml-5",
          heading: "bg-primary",
          indicator: "mr-5",
          content: "p-5 bg-slate-200",
        }}
        indicator={({ isOpen }) => (
          <>
            {!isOpen && context.config.selectedStage !== 1 && (
              <Button
                onPress={() => {
                  setConfig(
                    produce((draft) => {
                      draft.accordionVal = new Set(["1"]);
                    }),
                  );
                  context.setConfig(
                    produce((draft) => {
                      draft.selectedStage = 1;
                    }),
                  );
                }}
                radius="none"
                className="bg-white text-primary font-medium"
              >
                Edit
              </Button>
            )}
          </>
        )}
        title="Delivery Address"
        subtitle={`${!config.accordionVal.has("1") ? `${addressDetails.addressLine1} ${addressDetails.addressLine2}` : ""}`}
        aria-label="Delivery Address"
      >
        <AddressContext.Provider value={{ config, setConfig }}>
          <Header />
        </AddressContext.Provider>
        {displayMap}
        <AddressContext.Provider value={{ config, setConfig }}>
          <AddressFooter />
        </AddressContext.Provider>
      </AccordionItem>
    </Accordion>
  );
};
