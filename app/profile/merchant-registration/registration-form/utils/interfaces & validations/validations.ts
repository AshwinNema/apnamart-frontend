import { z } from "zod";

export const businessDetailsValidation = z.object({
  name: z.string().min(1, { message: "Business Name is required" }),
  description: z
    .string()
    .min(1, { message: "Business Description is required" }),
});

export const bankAndTaxDetailsValidation = z.object({
  bankAcNo: z.string().min(1, { message: "Please enter your Bank A/C No." }),
  gstIn: z.string().min(1, { message: "Please enter your GSTIN" }),
  panCard: z.string().min(1, { message: "Please enter your PAN Card Number" }),
});

export const pickUpAddressValidation = z.object({
  addressLine1: z.string().min(1, {
    message: "Shop No/Floor/Street Address is required",
  }),
  addressLine2: z.string().min(1, {
    message: "Area/ Colony/ State/ Province is required",
  }),
  pinCode: z.coerce
    .number()
    .int()
    .min(100000, {
      message: "Please enter a valid Pin Code",
    })
    .max(999999, {
      message: "Please enter a valid Pin Code",
    }),
});

export const finalDetailsValidation = businessDetailsValidation
  .merge(bankAndTaxDetailsValidation)
  .merge(pickUpAddressValidation)
  .merge(
    z.object({
      latitude: z.coerce.number(),
      longtitude: z.coerce.number(),
    }),
  );
