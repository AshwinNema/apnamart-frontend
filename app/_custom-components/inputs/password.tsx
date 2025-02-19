import { Input } from "@heroui/react";
import { ClearIcon } from "@/app/_utils/icons & logos";
import { useState } from "react";
import { passwordErrMsg, setVal } from "../../_utils";
import { loginValidationSchema } from "@/app/layout-components/login-signup/constants";
import { IoIosLock } from "react-icons/io";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { BsFillEyeFill } from "react-icons/bs";

export const PasswordInput = ({
  password,
  setData,
  placeholder,
  label,
  variant = "bordered",
  className,
}: {
  password: string;
  setData: setVal;
  placeholder?: string;
  label?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const toggleVisibility = () =>
    setIsVisible((prevVisibilty) => !prevVisibilty);

  const isInvalid = () => {
    if (!password) {
      return false;
    }
    const validationSchema = loginValidationSchema.shape.password;
    const validated = validationSchema.safeParse(password);
    return !validated.success;
  };

  return (
    <Input
      className={className}
      startContent={<IoIosLock className="scale-150" />}
      value={password}
      isInvalid={invalid}
      color={invalid ? "danger" : "default"}
      errorMessage={passwordErrMsg}
      onBlur={() => {
        setInvalid(isInvalid());
      }}
      endContent={
        <div className="flex items-center	gap-2">
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <HiMiniEyeSlash className="scale-[1.2] mb-2" />
            ) : (
              <BsFillEyeFill className="scale-[1.2] mb-2" />
            )}
          </button>

          {!!password && <ClearIcon onClick={() => setData("")} />}
        </div>
      }
      onValueChange={setData}
      label={`${label || "Password"}`}
      placeholder={`${placeholder || "Enter your password"}`}
      type={isVisible ? "text" : "password"}
      variant={variant}
    />
  );
};
