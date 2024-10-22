import { createUpdateDescriptionState } from "@/app/merchant/products/helpers";
import { produce } from "immer";
import { Dispatch, Fragment, SetStateAction } from "react";
import {
  AddNewDescriptionBtns,
  AddDescriptionSeriesInputs,
  DescriptionKeyVal,
} from "./parts";
import { v4 } from "uuid";
import { setNestedPath } from "@/app/_utils";
import { Textarea } from "@nextui-org/react";

export const SeriesDescription = ({
  config,
  setConfig,
}: {
  config: createUpdateDescriptionState;
  setConfig: Dispatch<SetStateAction<createUpdateDescriptionState>>;
}) => {
  return (
    <div>
      <AddNewDescriptionBtns config={config} setConfig={setConfig} />
      <AddDescriptionSeriesInputs
        config={config}
        setConfig={setConfig}
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
        Array.isArray(config.details.details) ? (
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
        )
      ) : null}
    </div>
  );
};
