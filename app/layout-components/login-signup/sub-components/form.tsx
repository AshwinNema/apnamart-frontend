import { loginConfig, modalTypes } from "../constants";
import { PasswordInput, TextInput } from "@/app/_custom-components/inputs";
import { Avatar, AvatarIcon } from "@heroui/react";
import { z } from "zod";
import { setKeyVal } from "@/app/_utils";
import { IoIosMail } from "react-icons/io";

export default function Form({
  formData,
  setData,
  modalType,
}: {
  formData: loginConfig["formData"];
  setData: setKeyVal;
  modalType: modalTypes | null;
}) {
  return (
    <>
      <p className="italic text-sm">Please enter your credentials</p>
      {modalType === modalTypes.signUp ? (
        <>
          <TextInput
            value={formData.name}
            setData={setData("name")}
            Icon={() => (
              <Avatar
                className="scale-75 relative top-2 right-0.5"
                size="sm"
                icon={<AvatarIcon />}
              />
            )}
            label="Name"
            placeholder="Please enter your name"
          />
        </>
      ) : null}
      <TextInput
        value={formData.email}
        setData={setData("email")}
        validationSchema={z.string().email()}
        Icon={() => <IoIosMail className="scale-150" />}
        label="Email"
        placeholder="Please enter your email"
      />

      <PasswordInput
        password={formData.password}
        setData={setData("password")}
        placeholder="Please enter your password"
      />
    </>
  );
}
