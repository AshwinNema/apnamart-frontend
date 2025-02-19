import {
  MainCreateUpdateProductContext,
  productFilterModalState,
} from "@/app/merchant/products/helpers";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { produce } from "immer";
import { Filter } from "./sub-components";

export const CreateUpdateProductFilterModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const [config, setConfig] = useState<productFilterModalState>({
    details: {},
  });
  useEffect(() => {
    if (!mainContext?.config?.selectedOptions) return;
    setConfig(
      produce((draft) => {
        draft.details = produce(mainContext?.config?.selectedOptions, () => {});
      }),
    );
  }, [mainContext?.config?.selectedOptions, isOpen]);

  if (!mainContext) return null;
  const { config: mainConfig, setConfig: setMainConfig } = mainContext;

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex justify-center">Product filters</div>
              </ModalHeader>
              <ModalBody>
                {mainConfig.filterList.map((filter) => {
                  return (
                    <Fragment key={filter.id}>
                      <Filter
                        details={filter}
                        config={config}
                        setConfig={setConfig}
                      />
                    </Fragment>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-end">
                  <Button
                    className="text-white"
                    onPress={() => {
                      setMainConfig(
                        produce((draft) => {
                          draft.selectedOptions = produce(
                            config.details,
                            () => {},
                          );
                        }),
                      );
                      onClose();
                    }}
                    color="warning"
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
