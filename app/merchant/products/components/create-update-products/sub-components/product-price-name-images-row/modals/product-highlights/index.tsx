import {
  getDefaultProductHighlightModalState,
  MainCreateUpdateProductContext,
  ProductHighlightModalContext,
  productHighlightModalState,
  resetProductHighlightModal,
} from "@/app/merchant/products/helpers";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { MainModalBody } from "./modal-body";
import { errorToast } from "@/app/_utils";
import { produce } from "immer";

export const ProductHighlights = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const [config, setConfig] = useState<productHighlightModalState>(
    getDefaultProductHighlightModalState(),
  );
  useEffect(() => {
    resetProductHighlightModal(mainContext, isOpen, setConfig);
  }, [mainContext?.config?.highlights, isOpen]);
  if (!mainContext) return null;
  return (
    <>
      <Modal
        classNames={{
          header: ["flex justify-center"],
          footer: ["flex justify-end"],
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>
                  {" "}
                  {mainContext?.config?.id ? "Update" : "Create"} Highlights
                </ModalHeader>
                <ProductHighlightModalContext.Provider
                  value={{
                    config,
                    setConfig,
                  }}
                >
                  <MainModalBody />
                </ProductHighlightModalContext.Provider>
                <ModalFooter>
                  <Button
                    color="warning"
                    className="text-white"
                    onPress={() => {
                      if (config.data.length < 4) {
                        errorToast({
                          msg: "There should be atleast 4 highlight pointers",
                        });
                        return;
                      }
                      mainContext.setConfig(
                        produce((draft) => {
                          draft.highlights = config.data.map(
                            (pointer) => pointer.data,
                          );
                        }),
                      );
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};
