import { errorToast, validateZodSchema } from "@/app/_utils";
import { createUpdateProductConfig } from "../../../interfaces & enums & constants";
import * as _ from "lodash";
import {
  createProductValidation,
  updateProductValidation,
} from "../../../validations";
import { getDescriptionPayload } from "./description-payload";

export const validateAndGetCreateUpdateProductPayload = (
  config: createUpdateProductConfig,
) => {
  const {
    selectedOptions,
    id,
    specifications,
    productImages,
    filterList,
    deletedImgs,
    uploadedImgs,
  } = config;
  const basicDetails = _.pick(config, ["name", "price", "itemId"]);
  const filterOptions = Object.values(selectedOptions);
  const deletedProductImgIds = deletedImgs.map(
    (details) => details.cloudinary_public_id,
  );

  if (filterOptions.length != filterList.length) {
    errorToast({ msg: "Please select all the filters" });
    return { data: null, error: true };
  }

  const multipleFiles: {
    key: string;
    file: File;
  }[] = [];

  const { description, updatedDescriptionImgIds } = getDescriptionPayload(
    config,
    multipleFiles,
  );

  const totalImagesCount = productImages.length + uploadedImgs.length;
  if (!totalImagesCount) {
    errorToast({ msg: "Product photos have to be attached" });
    return { error: true, data: null };
  }

  const createProductPayload = {
    ...basicDetails,
    filterOptions,
    specification: specifications,
    description,
  };
  const { error, data } = id
    ? validateZodSchema(
        {
          ...createProductPayload,
          updatedDescriptionImgIds,
          deletedProductImgIds,
        },
        updateProductValidation,
        true,
      )
    : validateZodSchema(createProductPayload, createProductValidation, true);

  if (productImages.length) {
    productImages.forEach((file) => {
      multipleFiles.push({ key: "productImages", file });
    });
  }
  if (!data) return { error, data: "", multipleFiles };
  return {
    error,
    data: JSON.stringify(data),
    multipleFiles,
  };
};
