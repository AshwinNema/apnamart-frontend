import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export const DeleteModal = ({
  isOpen,
  onOpenChange,
  deleteModalHeadertext,
  modalBodyMsg,
  deleteData,
}: {
  isOpen?: boolean;
  onOpenChange: () => void;
  deleteModalHeadertext: string;
  modalBodyMsg: string;
  deleteData: () => void;
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
                  fullWidth
                  color="danger"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>

                <Button onClick={() => deleteData()} color="danger" fullWidth>
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
