import {
  setCreateUpdateProductConfig,
  createUpdateDescriptionState,
  seriesConfig,
} from "../../../interfaces & enums & constants";
import { errorToast, setNestedPath, validateZodSchema } from "@/app/_utils";
import { requiredStringValidation } from "../../../validations";
import { seriesDescriptionCreateUpdate } from "./series-description";

export const createUpdateDescription = (
  config: createUpdateDescriptionState,
  onClose: () => void,
  setMainConfig: setCreateUpdateProductConfig,
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
        setNestedPath(setMainConfig)("description")(data);
      }
      break;

    case "object": {
      const { error } = seriesDescriptionCreateUpdate(
        config as seriesConfig,
        setMainConfig,
      );
      if (error) return;
      break;
    }
  }
  onClose();
};
