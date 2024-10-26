import {
  createUpdateDescriptionState,
  createUpdateProductConfig,
  descriptionStateEvents,
  setCreateUpdateProductConfig,
} from "../../interfaces & enums & constants";
import { Dispatch, SetStateAction } from "react";
import { produce } from "immer";
import { setNestedPath } from "@/app/_utils";
import { Subject } from "rxjs";

export const setInitialDescriptionState = (
  mainConfig: createUpdateProductConfig,
  setConfig: Dispatch<SetStateAction<createUpdateDescriptionState>>,
  setMainConfig: setCreateUpdateProductConfig,
  descriptionEventsEmitter: Subject<descriptionStateEvents>,
) => {
  const { updateDescriptionDetails } = mainConfig;
  if (!updateDescriptionDetails) return;
  setNestedPath(setMainConfig)("updateDescriptionDetails")(null);
  setConfig(
    produce((draft) => {
      draft.details = updateDescriptionDetails;
      if (
        updateDescriptionDetails &&
        typeof updateDescriptionDetails === "object" &&
        updateDescriptionDetails?.photo
      ) {
        descriptionEventsEmitter.next({
          type: "add file",
          data: updateDescriptionDetails?.photo,
        });
      }
      draft.isUpdating = true;
      if (
        typeof updateDescriptionDetails !== "string" &&
        updateDescriptionDetails.header
      ) {
        draft.enableHeader = true;
      }

      draft.seriesDescriptionType =
        typeof updateDescriptionDetails === "string"
          ? "text"
          : Array.isArray(updateDescriptionDetails.details)
            ? "pointers"
            : "text";

      if (
        typeof updateDescriptionDetails !== "string" &&
        updateDescriptionDetails.photo
      ) {
        draft.enablePhoto = true;
      }
    }),
  );
};
