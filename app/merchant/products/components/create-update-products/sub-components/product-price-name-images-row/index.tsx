import styles from "@/app/styles.module.css";
import { ProductFilterAndImages } from "./product-filter-and-images";
import { TextInput } from "@/app/_custom-components";
import { MainCreateUpdateProductContext } from "../../../../helpers";
import { useContext } from "react";
import { setNestedPath } from "@/app/_utils";
import { z } from "zod";

export const ProductPriceNameRow = () => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;

  return (
    <div className={`${styles["create-product-name-price-photo-row"]} mb-10`}>
      <div className="flex gap-3 items-center">
        <ProductFilterAndImages />
        <TextInput
          value={config.name}
          className="mb-3"
          classNames={{ mainWrapper: ["w-full"] }}
          setData={setNestedPath(setConfig)("name")}
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
        setData={setNestedPath(setConfig)("price")}
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
  );
};
