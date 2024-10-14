import { Dispatch, SetStateAction } from "react";
import {
  merchantListState,
  merchantSelectList,
  merchantSelectStatus,
} from "../../helper";
import { Select, SelectItem } from "@nextui-org/react";
import { produce } from "immer";

export const MerchantTypeSelect = (props: {
  config: merchantListState;
  setConfig: Dispatch<SetStateAction<merchantListState>>;
}) => {
  if (props.config.selectedRegistrationDetails) return null;
  return (
    <>
      <Select
        label="Registration status"
        color="primary"
        classNames={{base:["mb-3"]}}
        variant="faded"
        selectedKeys={[props.config.type]}
        className="max-w-xs"
        onChange={(e) => {
          props.setConfig(
            produce((draft) => {
              draft.type = e.target.value as merchantSelectStatus;
              draft.page = 1
            }),
          );
        }}
      >
        {merchantSelectList.map((selectOption) => (
          <SelectItem key={selectOption.key}>{selectOption.label}</SelectItem>
        ))}
      </Select>
    </>
  );
};
