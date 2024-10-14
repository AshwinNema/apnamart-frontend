import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableActionProps } from ".";

export const TableActions = ({
  onClick,
  deleteBtnText = "Delete",
  modalBodyMsg = "Are you sure you want to delete?",
  deleteMethod = HTTP_METHODS.DELETE,
  deleteUrl,
  deleteSuccessMsg,
  onDeleteSuccess,
  onDelete,
  editTooltipText = "",
  deleteToolTipText = "",
}: TableActionProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteData = (onClose: () => void) => {
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
        <Tooltip showArrow={true} color="secondary" content={editTooltipText}>
          <span className="cursor-pointer">
            <FaRegEdit className="scale-[1.3]" onClick={onClick} />
          </span>
        </Tooltip>
        <Tooltip showArrow={true} color="danger" content={deleteToolTipText}>
          <span className="cursor-pointer">
            <RiDeleteBin6Line
              onClick={onOpen}
              className="fill-[red] scale-[1.3]"
            />
          </span>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-weight text-4xl">
                {deleteBtnText}
              </ModalHeader>

              <ModalBody>{modalBodyMsg}</ModalBody>

              <ModalFooter>
                <Button
                  fullWidth
                  color="danger"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => deleteData(onClose)}
                  color="danger"
                  fullWidth
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
