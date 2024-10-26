import {
  fetchConfig,
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "@/app/_services";
import { appEndPoints, setVal } from "@/app/_utils";
import { createUpdateProductConfig } from "../interfaces & enums & constants";
import { validateAndGetCreateUpdateProductPayload } from "./helper";
import { MutableRefObject } from "react";
import { FileUploadWithPreview } from "file-upload-with-preview";

export const getItemsList = (
  query: { categoryId?: number },
  setData: setVal,
  clearList?: true,
  reqConfig?: fetchConfig,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    `${appEndPoints.ITEM_LIST}`,
    undefined,
    query,
    reqConfig,
  )
    .then((res) => {
      if (!res) return;
      const data = res.map(
        (item: { id: number; name: string; photo: string }) => {
          return {
            id: item.id,
            label: item.name,
            photo: item.photo,
          };
        },
      );
      setData(data);
    })
    .catch((err) => {
      clearList && setData([]);
      console.log(err);
    });
};

export const createUpdateProduct = (
  config: createUpdateProductConfig,
  onSuccess: () => void,
) => {
  const { error, data, multipleFiles } =
    validateAndGetCreateUpdateProductPayload(config);
  if (error || !data) return;
  makeUploadDataRequest(
    config.id ? HTTP_METHODS.PUT : HTTP_METHODS.POST,
    config?.id ? "" : appEndPoints.CREATE_PRODUCT,
    config.id ? {} : { data },
    undefined,
    {
      successMsg: `${config.id ? "Product updated successfully" : "Product created successfully"}`,
    },
    multipleFiles,
  ).then(() => {
    onSuccess();
  });
};
