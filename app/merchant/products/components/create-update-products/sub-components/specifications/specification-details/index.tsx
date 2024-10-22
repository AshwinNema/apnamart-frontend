import { errorToast } from "@/app/_utils";
import { MainCreateUpdateProductContext } from "@/app/merchant/products/helpers";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { CurrentSpecificationDetailsModal } from "./modals/current-specification";
import { CreateUpdateSpecification } from "./modals/create-update-specification";
import { useContext } from "react";
import { PiPlusCircleDuotone } from "react-icons/pi";
import { MdOutlinePreview } from "react-icons/md";

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
  const { config, setConfig } = mainContext;
  const { specifications } = config;
  return (
    <>
      <div className="flex items-center gap-1">
        {!config.specifications || Array.isArray(config.specifications) ? (
          <Tooltip
            color="primary"
            content={`${
              config.specificationType === "series"
                ? "Add new specification point"
                : "Add specification details"
            }`}
          >
            <Button
              onPress={() => {
                if (!config.specificationType) {
                  errorToast({ msg: "Please select specification type first" });
                  return;
                }
                openCreateUpdateModal();
              }}
              isIconOnly
              className="bg-transparent"
            >
              <PiPlusCircleDuotone className="scale-[3] fill-mainTheme" />
            </Button>
          </Tooltip>
        ) : null}

        <Tooltip
          className="text-white"
          color="warning"
          content="View Current Specification details"
        >
          <Button
            color="warning"
            className="text-white bg-transparent"
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
            <MdOutlinePreview className="scale-[3] fill-warningTheme" />
          </Button>
        </Tooltip>
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
