import { Input } from "@heroui/react";
import { useCallback, useState } from "react";
import { setNestedPath } from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";
import { TextInputProps, TextInputState } from "./interface";
import { invalidTextInputCheck } from "./utils";
import styles from "@/app/styles.module.css";

export const TextInput = ({
  value,
  Icon,
  className = "",
  variant = "bordered",
  autoFocus = false,
  labelPlacement = "inside",
  fullWidth = false,
  showClearIcon = true,
  type = "text",
  color = "default",
  ...props
}: TextInputProps) => {
  const [config, setConfig] = useState<TextInputState>({
    invalid: false,
    errorMsg: "",
    label: props.label || "",
    placeholder: `${props.placeholder ? props.placeholder : ""}`,
  });
  const setDataFunc = useCallback(setNestedPath(setConfig), [setConfig]);
  const isInvalid = () =>
    invalidTextInputCheck(value, props.validationSchema, setDataFunc);

  const EndContent = () => {
    return !!value && !props.isReadOnly && showClearIcon ? (
      <ClearIcon onClick={() => props.setData && props.setData("")} />
    ) : null;
  };

  return (
    <Input
      classNames={{
        ...props.classNames,
        input: [
          ...[
            props.classNames?.input,
            type === "number" ? styles["numberInput"] : "",
          ],
        ],
      }}
      autoFocus={autoFocus}
      startContent={Icon ? <Icon /> : null}
      value={value}
      isInvalid={config.invalid}
      color={config.invalid ? "danger" : color}
      labelPlacement={labelPlacement}
      errorMessage={`${config.errorMsg}`}
      isRequired={props.isRequired}
      isClearable={false}
      disabled={props.disabled}
      fullWidth={fullWidth}
      isReadOnly={props.isReadOnly}
      radius={props.radius}
      type={type}
      size={props.size}
      endContent={<EndContent />}
      onValueChange={(newVal) => {
        if (
          type === "number" &&
          newVal !== "" &&
          `${Number(newVal)}` !== newVal
        )
          return;
        props.setData && props.setData(newVal);
      }}
      label={config.label}
      className={`${className}`}
      placeholder={config.placeholder}
      variant={variant}
      onBlur={() => {
        props.onBlur && props.onBlur();
        setDataFunc("invalid")(isInvalid());
      }}
    />
  );
};
