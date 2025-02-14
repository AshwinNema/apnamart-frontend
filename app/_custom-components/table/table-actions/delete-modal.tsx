import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export const DeleteModal = ({
  isOpen,
  onOpenChange,
  deleteModalHeadertext,
  modalBodyMsg,
  deleteData,
  deleteBtnText = "Delete",
  deleteBtnColor = "danger",
}: {
  isOpen?: boolean;
  onOpenChange: () => void;
  deleteModalHeadertext: string;
  modalBodyMsg: string;
  deleteData: () => void;
  deleteBtnText?: string;
  deleteBtnColor?: ButtonProps["color"];
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center font-weight text-4xl">
                {deleteModalHeadertext}
              </ModalHeader>

              <ModalBody>{modalBodyMsg}</ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => deleteData()}
                  color={deleteBtnColor}
                  fullWidth
                >
                  {deleteBtnText}
                </Button>
                <Button fullWidth color="secondary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
