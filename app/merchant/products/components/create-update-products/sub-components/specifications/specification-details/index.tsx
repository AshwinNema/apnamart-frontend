import { errorToast } from "@/app/_utils";
import {
  createUpdateProductConfig,
  getCurState,
  MainCreateUpdateProductContext,
} from "@/app/merchant/products/helpers";
import { Button, useDisclosure } from "@nextui-org/react";
import { CurrentSpecificationDetailsModal } from "./modals/current-specification";
import { CreateUpdateSpecification } from "./modals/create-update-specification";
import { Dispatch, SetStateAction, useContext } from "react";

export const SpecificationDetails = () => {
  const {
    isOpen: isCurrentSpecificationModalOpen,
    onOpenChange: onCurrentSpecificationModalOpenChange,
    onOpen: openCurrentSpecificationModal,
  } = useDisclosure();

  const {
    isOpen: isCreateUpdateModalOpen,
    onOpen: openCreateUpdateModal,
    onOpenChange: createUpdateModalOpenChange,
  } = useDisclosure();
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const {config, setConfig} = mainContext
  const isCreateState = getCurState(config) === "create";
  const { specifications } = config;
  return (
    <>
      <div className="flex items-center gap-3">
        {isCreateState || Array.isArray(config.specifications) ? (
          <Button
            variant="flat"
            onPress={() => openCreateUpdateModal()}
            color="primary"
          >
            {config.specificationType === "series"
              ? "Add new specification"
              : "Add specification details"}
          </Button>
        ) : null}

        <Button
          color="warning"
          variant="flat"
          className="font-bold"
          onPress={() => {
            if (!specifications) {
              errorToast({ msg: "Please add specification details first" });
              return;
            }
            if (Array.isArray(specifications) && !specifications?.length) {
              errorToast({ msg: "Please add specification details first" });
              return;
            }
            openCurrentSpecificationModal();
          }}
        >
          View Current Specification details
        </Button>
      </div>
      <CurrentSpecificationDetailsModal
        isOpen={isCurrentSpecificationModalOpen}
        onOpenChange={onCurrentSpecificationModalOpenChange}
        openCreateUpdateModal={openCreateUpdateModal}
      />
      <CreateUpdateSpecification
        mainConfig={config}
        isOpen={isCreateUpdateModalOpen}
        onOpenChange={createUpdateModalOpenChange}
        setMainConfig={setConfig}
      />
    </>
  );
};
