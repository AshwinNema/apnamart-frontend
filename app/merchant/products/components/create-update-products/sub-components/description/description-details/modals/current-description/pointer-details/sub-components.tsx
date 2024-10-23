import { TableActions } from "@/app/_custom-components";
import {
  currentDescriptionModalProps,
  MainCreateUpdateProductContext,
  openUpdateDescriptionModalWithDetails,
  seriesDescription,
} from "@/app/merchant/products/helpers";
import { useContext } from "react";
import { produce } from "immer";
import { successToast } from "@/app/_utils";

export const CreateUpdateIcons = ({
  descriptionDetails,
  openCreateUpdateModal,
}: {
  descriptionDetails: seriesDescription;
  openCreateUpdateModal: currentDescriptionModalProps["openCreateUpdateModal"];
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { setConfig } = mainContext;
  return (
    <div>
      <TableActions
        onClick={() =>
          openUpdateDescriptionModalWithDetails(
            descriptionDetails,
            setConfig,
            openCreateUpdateModal,
          )
        }
        onDelete={(onClose) => {
          setConfig(
            produce((draft) => {
              if (!Array.isArray(draft.description)) return;
              draft.description = draft.description.filter(
                (details) => details.id !== descriptionDetails.id,
              );
            }),
          );
          successToast({ msg: "Pointer description deleted successfully" });
          onClose();
        }}
        editToolTipColor="warning"
        editTooltipText="Update pointer"
        deleteToolTipText="Delete pointer"
        updateToolTipClass="text-white fill-warningTheme"
        deleteModalHeadertext="Delete Pointer"
        editIconClass="fill-warningTheme"
      />
    </div>
  );
};
