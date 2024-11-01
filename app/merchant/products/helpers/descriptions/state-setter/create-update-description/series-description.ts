import {
  setCreateUpdateProductConfig,
  seriesDescription,
  seriesConfig,
} from "../../../interfaces & enums & constants";
import { errorToast, validateZodSchema } from "@/app/_utils";
import { v4 } from "uuid";
import {
  keyValArrValidation,
  requiredStringValidation,
} from "../../../validations";
import { produce } from "immer";

export const seriesDescriptionCreateUpdate = (
  config: seriesConfig,
  setMainConfig: setCreateUpdateProductConfig,
) => {
  let header: seriesDescription["header"];
  let photo: seriesDescription["photo"];
  if (config.enableHeader) {
    const { error, data } = validateZodSchema(
      config.details.header,
      requiredStringValidation("Header"),
      true,
    );
    if (error) return { error: true };
    header = data;
  }

  if (
    config.enablePhoto &&
    !config.details.photo &&
    !config.details.uploadedImg
  ) {
    errorToast({
      msg: "Photo is required",
    });
    return { error: true };
  }
  photo = config.details.photo;
  const { error, data } =
    typeof config.details.details === "string"
      ? validateZodSchema(
          config.details.details,
          requiredStringValidation("description details"),
          true,
        )
      : validateZodSchema(config.details.details, keyValArrValidation, true);

  if (error || !data) {
    return { error: true };
  }
  setMainConfig(
    produce((draft) => {
      const details: seriesDescription = {
        details: data,
        id: v4(),
        uploadedImg: config.details.uploadedImg,
        deletedUploadedImg: config.details.deletedUploadedImg,
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

      typeof draft.description !== "string" && draft.description.push(details);
    }),
  );

  return { error: false };
};
