import {
  productFilter,
  productFilterModalState,
  setProductFilterModalState,
} from "@/app/merchant/products/helpers";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { produce } from "immer";

export const Filter = ({
  details,
  config,
  setConfig,
}: {
  details: productFilter;
  config: productFilterModalState;
  setConfig: setProductFilterModalState;
}) => {
  const [selectedVal, setSelectedVal] = useState<string | null>(
    config.details?.[details.id] ? `${config.details?.[details.id]}` : null,
  );
  return (
    <RadioGroup
      onValueChange={(value) => {
        setSelectedVal(value);
        setConfig(
          produce((draft) => {
            draft.details[details.id] = parseInt(value);
          }),
        );
      }}
      value={selectedVal}
      color="primary"
      label={details.name}
    >
      {details.options.map((option) => {
        return (
          <Fragment key={option.id}>
            <Radio value={`${option.id}`}>{option.name}</Radio>
          </Fragment>
        );
      })}
    </RadioGroup>
  );
};
