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
                <Button onClick={() => deleteData()} color="danger" fullWidth>
                  Delete
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
