import { Button, ButtonProps, Tooltip, TooltipProps } from "@nextui-org/react";
import { ReactNode } from "react";

export const ToolTipBtn = ({
  children,
  buttonProps,
  toolTipProps,
}: {
  children?: ReactNode;
  buttonProps: ButtonProps;
  toolTipProps: TooltipProps;
}) => {
  return (
    <>
      <Tooltip {...toolTipProps}>
        <Button {...buttonProps}>{children}</Button>
      </Tooltip>
    </>
  );
};
