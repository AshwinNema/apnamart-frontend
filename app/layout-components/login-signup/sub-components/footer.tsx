import { Button, ModalFooter } from "@nextui-org/react";
import { loginConfig, modalTypes } from "../constants";
import { loginSignUp } from "../api";
import { useAppDispatch } from "@/lib/main/hooks";
import { variants } from "@/app/_utils";

export default function Footer({
  changeModalType,
  modalType,
  config,
  onClose,
  setData,
}: {
  changeModalType: () => void;
  modalType: modalTypes | null;
  config: loginConfig;
  onClose: () => void;
  setData: (key: string) => (value: any) => void;
}) {
  const dispatch = useAppDispatch();
  const { formData, currentStep } = config;
  return (
    <ModalFooter className="flex flex-col">
      {currentStep === 1 ? (
        <div className="flex justify-between gap-3 mb-5">
          <Button
            variant={variants.goBackBtn}
            fullWidth
            onClick={() => setData("currentStep")(0)}
             className="text-white"
          >
            Go Back
          </Button>

          <Button
            fullWidth
            onClick={() => loginSignUp(formData, onClose, modalType, dispatch)}
            color="success"
            className="text-white"
          >
            {modalType === modalTypes.signUp ? "Sign Up" : "Sign in"}
          </Button>
        </div>
      ) : currentStep === 0 ? (
        <Button onClick={() => setData("currentStep")(1)} color="primary">
          Next
        </Button>
      ) : null}
      <Button variant="flat" color="danger" fullWidth={true} onPress={onClose}>
        Cancel
      </Button>
      <p
        className="text-primary flex justify-end hover:cursor-pointer"
        onClick={changeModalType}
      >
        {modalType === modalTypes.signUp
          ? "Already a user click here to login"
          : "Don't have an account? Click here to sign up"}
      </p>
    </ModalFooter>
  );
}
