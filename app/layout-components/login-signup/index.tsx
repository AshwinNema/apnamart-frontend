import React, { useCallback, useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { Footer, MainFormBody } from "./sub-components";
import { keyVals, setMultiplePaths, setNestedPath } from "@/app/_utils";
import { defaultConfig, modalTypes, userRoles } from "./constants";

export default function LoginSignUpModal({
  isOpen,
  onOpenChange,
  modalType,
  setModalType,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  modalType: modalTypes | null;
  setModalType: (value: modalTypes) => void;
}) {
  const [config, setConfig] = useState(structuredClone(defaultConfig));
  const { formData } = config;
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  const setMultipleData = useCallback(setMultiplePaths(setConfig), [setConfig]);
  useEffect(() => {
    if (!isOpen) {
      setConfig(structuredClone(defaultConfig));
    }
  }, [isOpen]);

  // In case login user wants to sign up and the current role selected is admin, then we change the role to customer because user sign up of admin is not allowed from front end
  // We also remove the name in case we travel from signup to login
  // When user changes flow from login to signup or signup to login we again show user the option to select its role

  const changeModalType: () => void = () => {
    const updates: keyVals[] = [["currentStep", 0]];

    modalType === modalTypes.login &&
      formData.role === userRoles.admin.role &&
      updates.push(["formData.role", userRoles.customer.role]);

    modalType === modalTypes.signUp && updates.push(["formData.name", ""]);

    modalType === modalTypes.login
      ? setModalType(modalTypes.signUp)
      : setModalType(modalTypes.login);

    setMultipleData(updates);
  };

  return (
    <>
      <Modal
        className="max-h-[90vh] max-w-[40vw]"
        backdrop="blur"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        hideCloseButton={true}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="flex justify-center text-4xl">
                  {modalType === modalTypes.signUp
                    ? "Create your Account"
                    : "Welcome Back"}
                </p>
              </ModalHeader>

              <MainFormBody
                config={config}
                modalType={modalType}
                setData={setData}
                onClose={onClose}
              />

              <Footer
                changeModalType={changeModalType}
                modalType={modalType}
                config={config}
                onClose={onClose}
                setData={setData}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
