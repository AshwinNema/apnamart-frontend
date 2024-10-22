import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { TableActionProps } from "..";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteModal } from "./delete-modal";

export const TableActions = ({
  onClick,
  deleteModalHeadertext = "Delete",
  modalBodyMsg = "Are you sure you want to delete?",
  deleteMethod = HTTP_METHODS.DELETE,
  deleteUrl,
  deleteSuccessMsg,
  onDeleteSuccess,
  onDelete,
  editTooltipText = "",
  deleteToolTipText = "",
  editToolTipColor = "secondary",
  updateToolTipClass = "",
  showDeleteIcon = true,
  editIconClass = "",
}: TableActionProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const deleteData = () => {
    deleteUrl &&
      makeDataRequest(deleteMethod, deleteUrl, undefined, undefined, {
        successMsg: deleteSuccessMsg,
      }).then((res) => {
        if (!res) return;
        onClose();
        onDeleteSuccess && onDeleteSuccess();
      });
    onDelete && onDelete(onClose);
  };
  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <Tooltip
          className={`${updateToolTipClass}`}
          showArrow={true}
          color={editToolTipColor}
          content={editTooltipText}
        >
          <span className="cursor-pointer">
            <FaRegEdit
              className={`scale-[1.3] ${editIconClass}`}
              onClick={onClick}
            />
          </span>
        </Tooltip>
        {showDeleteIcon && (
          <Tooltip showArrow={true} color="danger" content={deleteToolTipText}>
            <span className="cursor-pointer">
              <RiDeleteBin6Fill
                onClick={onOpen}
                className="fill-dangerTheme scale-[1.3]"
              />
            </span>
          </Tooltip>
        )}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        deleteModalHeadertext={deleteModalHeadertext}
        modalBodyMsg={modalBodyMsg}
        deleteData={deleteData}
      />
    </>
  );
};
