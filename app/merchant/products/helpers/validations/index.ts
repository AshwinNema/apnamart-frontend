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
  id: z.string(),
});

export const keyValArrValidation = z.array(keyValValidation).min(1, {
  message: "There should be atleast one feature key and value",
});
