import {
  createUpdateSpecificationProps,
  createUpdateSpecificationState,
  specificationDetailsWithHeader,
} from "../../interfaces & enums & constants";
import { errorToast, setNestedPath, validateZodSchema } from "@/app/_utils";
import { v4 } from "uuid";
import {
  keyValArrValidation,
  requiredStringValidation,
} from "../../validations";
import { produce } from "immer";

export const createUpdateSpecification = (
  config: createUpdateSpecificationState,
  onClose: () => void,
  setMainConfig: createUpdateSpecificationProps["setMainConfig"],
) => {
  if (config.addNewKeyVal) {
    errorToast({
      msg: "Please complete/cancel adding current feature value before proceeding",
    });
    return;
  }
  switch (typeof config.details) {
    case "string":
      {
        const { error, data } = validateZodSchema(
          config.details,
          requiredStringValidation("Details"),
          true,
        );
        if (error) return;
        setNestedPath(setMainConfig)("specifications")(data);
      }
      break;

    case "object": {
      let header: specificationDetailsWithHeader["header"];
      if (config.enableHeader) {
        const { error, data } = validateZodSchema(
          config.details.header,
          requiredStringValidation("Header"),
          true,
        );
        if (error) return;
        header = data;
      }
      const { error, data } = validateZodSchema(
        config.details.keyVals,
        keyValArrValidation,
        true,
      );

      if (error || !data) {
        return;
      }
      setMainConfig(
        produce((draft) => {
          const details: specificationDetailsWithHeader = {
            keyVals: data,
            id: v4(),
          };

          if (header) details.header = header;
          const configDetails =
            config.details as specificationDetailsWithHeader;
          if (config.isUpdating && typeof draft.specifications !== "string") {
            const detailsIndex = draft.specifications.findIndex(
              (item) => item.id === configDetails.id,
            );
            if (detailsIndex === -1) return;
            draft.specifications[detailsIndex] = {
              ...details,
              id: configDetails.id,
            };
            return;
          }
          typeof draft.specifications !== "string" &&
            draft.specifications.push(details);
        }),
      );
      break;
    }
  }
  onClose();
};
