import React, { ReactElement, ReactNode } from "react";

interface stepperStep {
  stepLabel: string;
  stepDescription?: string;
  completed: boolean;
}

export interface stepperProps {
  steps: stepperStep[];
  currentStepIndex: number;
  onStepClick?: (step: object, stepIndex: number) => void;
  totalCompletedSteps: number;
  orientation?: "horizontal" | "vertical";
  labelPosition?: "left" | "right" | "top" | "bottom";
  stepContent?: (step: object, stepIndex: number) => ReactElement;
  renderNode?: (step: object, stepIndex: number) => ReactElement;
  styles?: object;
  nextStepErrs?: ReactNode[];
  stepIcons?: React.JSX.Element[];
  forwardStepsAllowed?: number;
}
