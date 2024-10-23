import {
  setCreateUpdateProductConfig,
  createUpdateDescriptionState,
  seriesDescription,
} from "../../interfaces & enums & constants";
import { errorToast, setNestedPath, validateZodSchema } from "@/app/_utils";
import { v4 } from "uuid";
import {
  keyValArrValidation,
  requiredStringValidation,
} from "../../validations";
import { produce } from "immer";

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
      let header: seriesDescription["header"];
      let photo: seriesDescription["photo"];
      if (config.enableHeader) {
        const { error, data } = validateZodSchema(
          config.details.header,
          requiredStringValidation("Header"),
          true,
        );
        if (error) return;
        header = data;
      }
      if (config.enablePhoto && !config.details.photo) {
        errorToast({
          msg: "Photo is required",
        });
        return;
      }
      photo = config.details.photo;
      const { error, data } =
        typeof config.details.details === "string"
          ? validateZodSchema(
              config.details.details,
              requiredStringValidation("description details"),
              true,
            )
          : validateZodSchema(
              config.details.details,
              keyValArrValidation,
              true,
            );

      if (error || !data) {
        return;
      }
      setMainConfig(
        produce((draft) => {
          const details: seriesDescription = {
            details: data,
            id: v4(),
          };

          if (header) details.header = header;
          if (photo) details.photo = photo;
          const configDetails = config.details as seriesDescription;
          if (config.isUpdating && typeof draft.description !== "string") {
            const detailsIndex = draft.description.findIndex(
              (item) => item.id === configDetails.id,
            );
            if (detailsIndex === -1) return;
            draft.description[detailsIndex] = {
              ...details,
              id: configDetails.id,
            };
            return;
          }
          typeof draft.description !== "string" &&
            draft.description.push(details);
        }),
      );
      break;
    }
  }
  onClose();
};
