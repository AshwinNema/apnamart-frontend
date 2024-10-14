import { TextInput } from "@/app/_custom-components";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import { ModalBody } from "@nextui-org/react";
import {
  bodyState,
  defaultModalBodyConfig as getDefaultConfig,
  tableDataDataElement,
  MainModalContext,
} from "../../helper";
import { useCallback, useContext, useEffect, useState } from "react";
import MainBodyImg from "./sub-parts/main-body-img";
import { useProductSelector } from "@/lib/product/hooks";
import { MainBodyAutoCompletes } from "./sub-parts/main-body-autocompletes";

// This component contains the main details of the entity for creation and updation. It has the following state -
// img - When we are updating an entity, we have the image url from which we show image we store that url here
// showImage - When we are updating an entity, we control whether we are showing the uploading component, in case we are replacing current image or the current image that was uploading during creation or previous image updation
// autocompletes - subcategory autocomplete showing list of subcategory, item autocomplete  showing list of items

export const MainModalBody = () => {
  const [config, setConfig] = useState(getDefaultConfig());
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const setMultiData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  const mainData = useContext(MainModalContext);
  const isOpen = useProductSelector((state) => state.componentDetails.isOpen);
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;

  useEffect(() => {
    !isOpen && setConfig(getDefaultConfig());
  }, [isOpen]);

  useEffect(() => {
    modalDetails && setModalCrtState();
    !modalDetails && setConfig(getDefaultConfig());
  }, [modalDetails, modalDetails?.photo]);

  if (!mainData || mainData.config.bodyState !== bodyState.details) return null;

  const { config: mainConfig, setMainData } = mainData;
  const setModalCrtState = () => {
    setMultiData([
      ["showImage", true],
      ["showUpdateSaveBtn", false],
    ]);
    mainConfig.upload?.resetPreviewPanel();
  };

  return (
    <div>
      <ModalBody>
        <MainBodyImg
          config={config}
          setData={setData}
          setConfig={setConfig}
          setModalCrtState={setModalCrtState}
        />
        <TextInput
          classNames={{
            mainWrapper: ["w-full"],
          }}
          variant="faded"
          fullWidth={true}
          value={mainConfig.name}
          setData={setMainData("name")}
          label="Name"
        />
        <MainBodyAutoCompletes />
      </ModalBody>
    </div>
  );
};
