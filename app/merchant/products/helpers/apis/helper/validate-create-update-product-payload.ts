import { errorToast, validateZodSchema } from "@/app/_utils";
import {
  createUpdateProductConfig,
  seriesDescription,
} from "../../interfaces & enums & constants";
import * as _ from "lodash";
import { createProductValidation } from "../../validations";

export const validateAndGetCreateUpdateProductPayload = (
  config: createUpdateProductConfig,
) => {
  const { selectedOptions, id, specifications, productImages } = config;
  const basicDetails = _.pick(config, ["name", "price", "itemId"]);
  const filterOptions = Object.values(selectedOptions);
  const { description, descriptionFiles } = Array.isArray(config.description)
    ? config.description.reduce(
        (
          descriptionDetails: {
            description: Omit<seriesDescription, "photo">[];
            descriptionFiles: File[];
          },
          stageDetails,
        ) => {
          const { photo, ...details } = stageDetails;
          descriptionDetails.description.push(details);
          photo && descriptionDetails.descriptionFiles.push(photo);
          return descriptionDetails;
        },
        {
          description: [],
          descriptionFiles: [],
        },
      )
    : { description: config.description, descriptionFiles: [] };

  if (!productImages.length && !id) {
    errorToast({ msg: "Product photos have to be attached" });
    return { error: true, data: null };
  }

  const { error, data } = id
    ? { error: false, data: {} }
    : validateZodSchema(
        {
          ...basicDetails,
          filterOptions,
          specification: specifications,
          description,
        },
        createProductValidation,
        true,
      );

  const multipleFiles: {
    key: string;
    file: File;
  }[] = [];

  if (descriptionFiles?.length) {
    descriptionFiles.forEach((file) => {
      multipleFiles.push({ key: "descriptionFiles", file });
    });
  }

  if (productImages.length) {
    productImages.forEach((file) => {
      multipleFiles.push({ key: "productImages", file });
    });
  }
  return {
    error,
    data: JSON.stringify(data),
    multipleFiles,
  };
};
