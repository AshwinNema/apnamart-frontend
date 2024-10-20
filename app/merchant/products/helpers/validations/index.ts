import { z } from "zod";

export const requiredStringValidation = (keyName: string) => {
  return z
    .string()
    .transform((val) => val.trim())
    .refine((val) => !!val.length, {
      message: `${keyName} is required`,
    });
};

export const newSpecificationValidation = z.object({
  newKey: requiredStringValidation("Feature Key"),
  newVal: requiredStringValidation("Feature Value"),
});

export const specificationKeyValValidation = z.object({
  key: requiredStringValidation("Feature Key"),
  val: requiredStringValidation("Feature Value"),
  id: z.string(),
});

export const specificationKeyValArrValidation = z
  .array(specificationKeyValValidation)
  .min(1, {
    message: "There should be atleast one feature key and value",
  });
