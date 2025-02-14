import {
  addNewHighlightPointer,
  ProductHighlightModalContext,
} from "@/app/merchant/products/helpers";
import { Button, Card, ModalBody } from "@heroui/react";
import { setNestedPath } from "@/app/_utils";
import { TextInput } from "@/app/_custom-components";
import { CancelUpdateKeyValIcons } from "@/app/merchant/products/components/common-components";
import { produce } from "immer";
import { Fragment, useContext } from "react";
import { HighlightPoint } from "./highlight-point";

export const MainModalBody = () => {
  const modalContext = useContext(ProductHighlightModalContext);
  if (!modalContext) return null;
  const { config, setConfig } = modalContext;
  const setHightlightPoint = (val: string) =>
    setNestedPath(setConfig)("newHightlightPoint")(val);

  return (
    <>
      <ModalBody>
        <div
          className={`flex justify-end ${!config.showAddNewBtn && "invisible"}`}
        >
          <Button
            color="warning"
            className="text-white"
            onPress={() => setNestedPath(setConfig)("showAddNewBtn", true)()}
          >
            Add new pointer
          </Button>
        </div>

        <div
          className={`${config.showAddNewBtn && "invisible"} flex gap-3 items-center`}
        >
          <TextInput
            value={config.newHightlightPoint}
            label="New highlight point"
            placeholder="Enter new highlight point"
            setData={setHightlightPoint}
          />
          <CancelUpdateKeyValIcons
            type="new"
            onCancel={() => {
              setConfig(
                produce((draft) => {
                  draft.newHightlightPoint = "";
                  draft.showAddNewBtn = true;
                }),
              );
            }}
            onSuccess={() => {
              addNewHighlightPointer(config.newHightlightPoint, setConfig);
            }}
            entity="highlight point"
          />
        </div>

        {!config.data.length ? (
          <div className="flex justify-center font-bold">
            No points are currently added
          </div>
        ) : (
          <>
            {config.data.map((highlightPointDetails) => {
              return (
                <Fragment key={highlightPointDetails.id}>
                  <HighlightPoint {...highlightPointDetails} />
                </Fragment>
              );
            })}{" "}
          </>
        )}
      </ModalBody>
    </>
  );
};
