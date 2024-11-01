import {
  createUpdateProductConfig,
  seriesDescriptionPayload,
} from "../../../interfaces & enums & constants";

export const getDescriptionPayload = (
  config: createUpdateProductConfig,
  multipleFiles: {
    key: string;
    file: File;
  }[],
) => {
  const {
    description,
    descriptionFiles,
    updateDescriptionImgs,
    updatedDescriptionImgIds,
  } = Array.isArray(config.description)
    ? config.description.reduce(
        (
          descriptionDetails: {
            description: seriesDescriptionPayload[];
            descriptionFiles: File[];
            updateDescriptionImgs: File[];
            updatedDescriptionImgIds: string[];
          },
          stageDetails,
        ) => {
          const { photo, uploadedImg, deletedUploadedImg, ...details } =
            stageDetails;

          const allDetails: seriesDescriptionPayload = structuredClone(details);
          if (uploadedImg) allDetails.photo = uploadedImg;
          descriptionDetails.description.push(allDetails);

          photo &&
            !deletedUploadedImg &&
            descriptionDetails.descriptionFiles.push(photo);
          if (photo && deletedUploadedImg) {
            descriptionDetails.updateDescriptionImgs.push(photo);
            descriptionDetails.updatedDescriptionImgIds.push(stageDetails.id);
          }

          return descriptionDetails;
        },
        {
          description: [],
          descriptionFiles: [],
          updateDescriptionImgs: [],
          updatedDescriptionImgIds: [],
        },
      )
    : {
        description: config.description,
        descriptionFiles: [],
        updateDescriptionImgs: [],
        updatedDescriptionImgIds: [],
      };
  if (descriptionFiles?.length) {
    descriptionFiles.forEach((file) => {
      multipleFiles.push({
        key: config.id ? "newDescriptionFiles" : "descriptionFiles",
        file,
      });
    });
  }

  if (updateDescriptionImgs?.length) {
    updateDescriptionImgs.forEach((file) => {
      multipleFiles.push({
        key: "updatedDescriptionFiles",
        file,
      });
    });
  }

  return { description, updatedDescriptionImgIds };
};
