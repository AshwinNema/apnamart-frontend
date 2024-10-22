import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  createUpdateProductConfig,
  getDefaultCreateUpdateProductConfig,
  MainContext,
  MainCreateUpdateProductContext,
} from "../../helpers";
import { BackIcon, TextInput } from "@/app/_custom-components";
import { getCategorySearchList } from "@/app/admin/products/helper";
import { setNestedPath } from "@/app/_utils";
import {
  Autocompletes,
  Description,
  ProductImages,
  Specifications,
} from "./sub-components";
import { z } from "zod";
import { FileUploadWithPreview } from "file-upload-with-preview";
import styles from "@/app/styles.module.css";
import { Button, Tooltip } from "@nextui-org/react";

export const CreateUpdateProducts = () => {
  const mainState = useContext(MainContext);
  const [config, setConfig] = useState<createUpdateProductConfig>(
    getDefaultCreateUpdateProductConfig(),
  );
  const uploadRef = useRef<FileUploadWithPreview | null>(null);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);
  useEffect(() => {
    getCategorySearchList(setData("categoryList"));
  }, []);
  if (!mainState) return null;
  return (
    <div className="m-2">
      <div className="font-bold flex justify-between mb-3">
        <div>
          <Tooltip content="Go back to main product screen" color="secondary">
            <Button
              onPress={() => {
                setNestedPath(mainState.setConfig)("currentState")(
                  "main screen",
                );
              }}
              isIconOnly
              className="bg-transparent"
            >
              <BackIcon />
            </Button>
          </Tooltip>
        </div>
        <div className="text-3xl ">Create Product</div>
        <div></div>
      </div>
      <MainCreateUpdateProductContext.Provider value={{ config, setConfig }}>
        <Autocompletes />
        <div
          className={`${styles["create-product-name-price-photo-row"]} mb-10`}
        >
          <div className="flex gap-3 items-center">
            <ProductImages uploadRef={uploadRef} />
            <TextInput
              value={config.name}
              className="mb-3"
              classNames={{ mainWrapper: ["w-full"] }}
              setData={setData("name")}
              variant="flat"
              validationSchema={z.string({
                message: "Name is required",
              })}
              fullWidth={true}
              isRequired={true}
              label="Name"
            />
          </div>

          <TextInput
            value={config.price}
            setData={setData("price")}
            type="number"
            className="mb-3"
            variant="flat"
            classNames={{ mainWrapper: ["w-full"] }}
            validationSchema={z.coerce
              .number({
                message: "Price must be a number",
              })
              .min(1, {
                message: "Price cannot be less than 1",
              })}
            fullWidth={true}
            isRequired={true}
            label="Price"
          />
        </div>

        <Specifications />
        <Description />
      </MainCreateUpdateProductContext.Provider>
    </div>
  );
};
