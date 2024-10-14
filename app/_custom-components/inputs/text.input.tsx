import { Input } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { setNestedPath } from "@/app/_utils";
import { ClearIcon } from "@/app/_utils/icons & logos";
import { TextInputProps, TextInputState } from "./interface";
import { invalidTextInputCheck } from "./utils";
import styles from "@/app/styles.module.css";

export const TextInput = ({
  value,
  setData,
  validationSchema,
  Icon,
  className = "",
  classNames,
  variant = "bordered",
  autoFocus = false,
  labelPlacement = "inside",
  fullWidth = false,
  type = "text",
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
    invalidTextInputCheck(value, validationSchema, setDataFunc);

  const EndContent = () => {
    return !!value && !props.isReadOnly ? (
      <ClearIcon onClick={() => setData("")} />
    ) : null;
  };

  return (
    <Input
      classNames={{
        ...classNames,
        input: [
          ...[
            classNames?.input,
            type === "number" ? styles["numberInput"] : "",
          ],
        ],
      }}
      autoFocus={autoFocus}
      startContent={Icon ? <Icon /> : null}
      value={value}
      isInvalid={config.invalid}
      color={config.invalid ? "danger" : "default"}
      labelPlacement={labelPlacement}
      errorMessage={`${config.errorMsg}`}
      isRequired={props.isRequired}
      isClearable={false}
      fullWidth={fullWidth}
      isReadOnly={props.isReadOnly}
      type={type}
      endContent={<EndContent />}
      onValueChange={(newVal) => {
        if (type === "number" && `${Number(newVal)}` !== newVal) return;
        setData(newVal);
      }}
      label={config.label}
      className={`${className}`}
      placeholder={config.placeholder}
      variant={variant}
      onBlur={() => {
        setDataFunc("invalid")(isInvalid());
      }}
    />
  );
};
