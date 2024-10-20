import { useCallback, useContext, useEffect, useState } from "react";
import {
  createUpdateProductConfig,
  getDefaultCreateUpdateProductConfig,
  MainContext,
  MainCreateUpdateProductContext,
} from "../../helpers";
import { TextInput } from "@/app/_custom-components";
import { getCategorySearchList } from "@/app/admin/products/helper";
import { setNestedPath } from "@/app/_utils";
import { Autocompletes, FileUpload, Specifications } from "./sub-components";
import { z } from "zod";
import { FileUploadWithPreview } from "file-upload-with-preview";

export const CreateUpdateProducts = () => {
  const mainState = useContext(MainContext);
  const [config, setConfig] = useState<createUpdateProductConfig>(
    getDefaultCreateUpdateProductConfig(),
  );
  const [upload, setUpload] = useState<FileUploadWithPreview | null>(null);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    getCategorySearchList(setData("categoryList"));
  }, []);
  if (
    mainState?.config?.currentState !== "create" &&
    mainState?.config?.currentState !== "update"
  )
    return null;
  return (
    <div className="m-2">
      <MainCreateUpdateProductContext.Provider value={{ config, setConfig }}>
        <Autocompletes  />
        <TextInput
          value={config.name}
          className="mb-3"
          classNames={{ mainWrapper: ["w-full"] }}
          setData={setData("name")}
          validationSchema={z.string({
            message: "Name is required",
          })}
          labelPlacement="outside-left"
          fullWidth={true}
          isRequired={true}
          label="Name"
        />
        <TextInput
          value={config.price}
          setData={setData("price")}
          type="number"
          className="mb-3"
          classNames={{ mainWrapper: ["w-full"] }}
          validationSchema={z.coerce
            .number({
              message: "Price must be a number",
            })
            .min(1, {
              message: "Price cannot be less than 1",
            })}
          labelPlacement="outside-left"
          fullWidth={true}
          isRequired={true}
          label="Price"
        />
        <FileUpload setUpload={setUpload} upload={upload} />
        <Specifications  />
      </MainCreateUpdateProductContext.Provider>
    </div>
  );
};
