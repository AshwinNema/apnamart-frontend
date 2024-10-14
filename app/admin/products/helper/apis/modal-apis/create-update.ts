import {
  HTTP_METHODS,
  makeDataRequest,
  makeUploadDataRequest,
} from "@/app/_services";
import { createUpdateParams } from "../../interfaces & enums";
import * as _ from "lodash";
import {
  setDetails,
  tabKeys,
} from "@/lib/product/slices/component-details.slice";
import { ProductDispatch } from "@/lib/product/store";
import { setModalDetails } from "@/lib/product/slices/modal-details.slice";
import {
  getCreateUpdatePayload,
  getCreateUrl,
  getUpdateUrl,
  getUploadUrl,
  validateCreateUpdatePayload,
} from "../utils";

export const createUpdateData = (data: createUpdateParams) => {
  const { successCallback, tab, config } = data;
  const { id } = config;
  const err = validateCreateUpdatePayload(config, tab);

  if (err) return;
  const payload = getCreateUpdatePayload({ tab, config });
  id
    ? makeDataRequest(
        HTTP_METHODS.PUT,
        getUpdateUrl(tab, id),
        payload,
        undefined,
        { successMsg: `${tab} updated successfully` },
      ).then((res) => {
        if (!res) return;
        successCallback();
      })
    : makeUploadDataRequest(
        HTTP_METHODS.POST,
        getCreateUrl(tab),
        payload,
        undefined,
        {
          successCallback,
          successMsg: id
            ? `${tab} updated successfully`
            : `${tab} created successfully`,
        },
      ).then((res) => {
        if (!res) return;
      });
};

export const updateMainImg = ({
  id,
  file,
  refreshData,
  tabType,
  dispatch,
}: {
  id: number;
  file: File;
  refreshData: boolean;
  tabType: tabKeys;
  dispatch: ProductDispatch;
}) => {
  const url = getUploadUrl(tabType, id);
  makeUploadDataRequest(HTTP_METHODS.PUT, url, { file }, undefined, {
    successMsg: `${tabType} Image uploaded successfully`,
  }).then((response) => {
    if (!response) return;
    dispatch(
      setModalDetails({
        photo: response.photo,
      }),
    );
    dispatch(setDetails({ refreshData: !refreshData }));
  });
};
