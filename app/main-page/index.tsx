import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { entityConfig, entityData } from "./entity-config";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { setNestedPath } from "../_utils";
import { Spinner } from "../_custom-components";

export const EntityDashboard = ({
  entityKey,
}: {
  entityKey: keyof entityData;
}) => {
  const router = useRouter();
  const path = usePathname();
  const details = entityConfig[entityKey];
  const [config, setConfig] = useState({
    showSpinner: false,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  useEffect(() => {
    setData("showSpinner")(false);

    return () => {
      setData("showSpinner")(false);
    };
  }, [path, setData]);

  return (
    <>
      <Card className="m-5 mt-11">
        <CardHeader className="flex justify-center font-bold text-4xl">
          {details.header}
        </CardHeader>
        <CardBody>
          <div className="text-xl mt-8 mb-11">{details.description}</div>
          <Listbox
            onAction={(key) => {
              setNestedPath(setConfig)("showSpinner")(true);
              router.push(key as string);
            }}
          >
            {details.list.map((item) => {
              return (
                <ListboxItem
                  key={item.key}
                  startContent={item.icon}
                  description={item.description}
                  showDivider
                  classNames={{
                    title: ["font-bold"],
                  }}
                >
                  {item.title}
                </ListboxItem>
              );
            })}
          </Listbox>
        </CardBody>
        <CardFooter>
          <div>
            <div className="text-xl">{details.footer}</div>
            <p className="font-bold mt-5">
              Note: You can navigate to the above respective function by
              clicking on them or through menu in the nav bar
            </p>
          </div>
        </CardFooter>
      </Card>
      {config.showSpinner && <Spinner />}
    </>
  );
};

export default EntityDashboard;
