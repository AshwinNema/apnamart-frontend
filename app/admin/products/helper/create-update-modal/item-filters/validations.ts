import { z } from "zod";
import * as _ from "lodash";
import {
  createUpdateItemState,
  MainModalState,
} from "../../interfaces & enums";
import { errorToast, getZodErrMsg, toastErrorIcons } from "@/app/_utils";

export const itemFilterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .transform((val) => val.trim()),
  options: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]),
        name: z
          .string()
          .trim()
          .min(1, { message: "Option Name is required" })
          .transform((val) => val.trim()),
      }),
    )
    .min(1, { message: "Please add atleast one option" })
    .refine(
      (data) => {
        const names = data.map((item) => item.name.trim());
        return names.length === new Set(names).size;
      },
      { message: "All options must have a unique name" },
    ),
  isMainFilter: z.boolean(),
});

export const validateFilter = (
  config: createUpdateItemState,
  filterItems: MainModalState["filterItems"],
) => {
  const details = _.pick(config, ["name", "options", "isMainFilter"]);

  const duplicateName = filterItems.filter(
    (item) => item.id !== config.filterId && item.name === config.name,
  )[0];

  if (duplicateName) {
    errorToast({
      msg: "Filter with this name is already present",
      iconType: toastErrorIcons.validation,
    });
    return {
      error: true,
    };
  }
  const { error, data } = itemFilterSchema.safeParse(details);
  if (error) {
    errorToast({
      msg: getZodErrMsg(error),
      iconType: toastErrorIcons.validation,
    });
  }
  return { error, data };
};
