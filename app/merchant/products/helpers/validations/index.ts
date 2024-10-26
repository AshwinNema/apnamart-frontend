import { z } from "zod";

export const requiredStringValidation = (keyName: string) => {
  return z
    .string()
    .transform((val) => val.trim())
    .refine((val) => !!val.length, {
      message: `${keyName} is required`,
    });
};

export const newKeyValValidation = z.object({
  newKey: requiredStringValidation("Feature Key"),
  newVal: requiredStringValidation("Feature Value"),
});

export const keyValValidation = z.object({
  key: requiredStringValidation("Feature Key"),
  val: requiredStringValidation("Feature Value"),
  id: requiredStringValidation("Id"),
});

export const keyValArrValidation = z.array(keyValValidation).min(1, {
  message: "There should be atleast one feature key and value",
});

export const createProductValidation = z.object({
  name: requiredStringValidation("Name"),
  itemId: z
    .number({ message: "Please select item" })
    .int({ message: "Please select item" })
    .min(1),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be frater than 0" }),
  filterOptions: z.array(z.number().positive()),
  description: z.union([
    requiredStringValidation("Description"),
    z
      .array(
        z.object({
          id: requiredStringValidation("Id"),
          header: requiredStringValidation("Header").optional(),
          details: z.union([
            requiredStringValidation("Details"),
            keyValArrValidation,
          ]),
        }),
      )
      .min(1, {}),
  ]),
  specification: z.union([
    requiredStringValidation("Specification"),
    z.array(
      z.object({
        id: requiredStringValidation("Id"),
        header: requiredStringValidation("Header").optional(),
        keyVals: keyValArrValidation,
      }),
    ),
  ]),
});
