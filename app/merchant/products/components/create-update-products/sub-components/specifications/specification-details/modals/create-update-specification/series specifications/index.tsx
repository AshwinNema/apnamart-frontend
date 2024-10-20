import { createUpdateSpecificationState } from "@/app/merchant/products/helpers";
import { produce } from "immer";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { AddNewBtns, AddSeriesInputs, SpecificationKeyVal } from "./parts";
import { v4 } from "uuid";

export const SeriesSpecification = ({
  config,
  setConfig,
}: {
  config: createUpdateSpecificationState;
  setConfig: Dispatch<SetStateAction<createUpdateSpecificationState>>;
}) => {
  return (
    <div>
      <AddNewBtns config={config} setConfig={setConfig} />
      <AddSeriesInputs
        config={config}
        setConfig={setConfig}
        onAdd={(key: string, val: string) => {
          setConfig(
            produce((draft) => {
              typeof draft.details !== "string" &&
                draft.details.keyVals.push({
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
        <ul className="list-disc">
          {config.details.keyVals.map((keyVal) => {
            return (
              <Fragment key={keyVal.id}>
                <SpecificationKeyVal keyVal={keyVal} setNewSpecificationConfig={setConfig} />
              </Fragment>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
