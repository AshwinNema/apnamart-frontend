import { errorToast } from "@/app/_utils";
import { MainCreateUpdateProductContext } from "@/app/merchant/products/helpers";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { CurrentDescriptionDetailsModal } from "./modals/current-description";
import { CreateUpdateDescription } from "./modals/create-update-description";
import { useContext } from "react";
import { PiPlusCircleDuotone } from "react-icons/pi";
import { MdOutlinePreview } from "react-icons/md";

export const DescriptionDetails = () => {
  const {
    isOpen: isCurrentDescriptionModalOpen,
    onOpenChange: onCurrentDescriptionModalOpenChange,
    onOpen: openCurrentDescriptionModal,
  } = useDisclosure();

  const {
    isOpen: isCreateUpdateModalOpen,
    onOpen: openCreateUpdateModal,
    onOpenChange: createUpdateModalOpenChange,
  } = useDisclosure();
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config } = mainContext;
  const { description, descriptionType } = config;
  return (
    <>
      <div className="flex items-center gap-1">
        {!description || Array.isArray(description) ? (
          <Tooltip
            color="primary"
            content={`${
              descriptionType === "series"
                ? "Add new description pointer"
                : "Add description"
            }`}
          >
            <Button
              onPress={() => {
                if (!descriptionType) {
                  errorToast({ msg: "Please select description type first" });
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
          content="View Current Description details"
        >
          <Button
            color="warning"
            className="text-white bg-transparent"
            onPress={() => {
              if (!description) {
                errorToast({ msg: "Please add description details first" });
                return;
              }
              if (Array.isArray(description) && !description?.length) {
                errorToast({ msg: "Please add description points" });
                return;
              }
              openCurrentDescriptionModal();
            }}
          >
            <MdOutlinePreview className="scale-[3] fill-warningTheme" />
          </Button>
        </Tooltip>
      </div>
      <CurrentDescriptionDetailsModal
        isOpen={isCurrentDescriptionModalOpen}
        onOpenChange={onCurrentDescriptionModalOpenChange}
        openCreateUpdateModal={openCreateUpdateModal}
      />
      <CreateUpdateDescription
        isOpen={isCreateUpdateModalOpen}
        onOpenChange={createUpdateModalOpenChange}
      />
    </>
  );
};
