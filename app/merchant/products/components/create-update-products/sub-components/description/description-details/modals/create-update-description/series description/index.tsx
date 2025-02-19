import { CreateUpdateDescriptionContext } from "@/app/merchant/products/helpers";
import { produce } from "immer";
import { Fragment, useContext } from "react";
import {
  AddNewDescriptionBtns,
  AddDescriptionSeriesInputs,
  DescriptionKeyVal,
  UploadedImage,
} from "./parts";
import { v4 } from "uuid";
import { setNestedPath } from "@/app/_utils";
import { Textarea } from "@heroui/react";

export const SeriesDescription = () => {
  const mainDescriptionContext = useContext(CreateUpdateDescriptionContext);
  if (!mainDescriptionContext) return null;
  const { config, setConfig } = mainDescriptionContext;

  return (
    <div>
      <AddNewDescriptionBtns />
      <AddDescriptionSeriesInputs
        onAdd={(key: string, val: string) => {
          setConfig(
            produce((draft) => {
              typeof draft.details !== "string" &&
                Array.isArray(draft.details.details) &&
                draft.details.details.push({
                  key,
                  val,
                  id: v4(),
                });
              draft.newKey = "";
              draft.newVal = "";
            }),
          );
        }}
      />
      {typeof config.details !== "string" ? (
        <>
          <UploadedImage uploadedImg={config?.details?.uploadedImg} />
          {Array.isArray(config.details.details) ? (
            <ul className="list-disc">
              {config.details.details.map((keyVal) => {
                return (
                  <Fragment key={keyVal.id}>
                    <DescriptionKeyVal
                      keyVal={keyVal}
                      setCreateUpdateDescriptionState={setConfig}
                    />
                  </Fragment>
                );
              })}
            </ul>
          ) : (
            <>
              <Textarea
                size="lg"
                label="Description"
                value={config.details.details}
                className="mt-5"
                onValueChange={setNestedPath(setConfig)("details.details")}
              />
            </>
          )}
        </>
      ) : null}
    </div>
  );
};
