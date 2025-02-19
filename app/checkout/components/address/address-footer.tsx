import { Button } from "@heroui/react";
import { IoSaveSharp } from "react-icons/io5";
import styles from "@/app/styles.module.css";
import { useContext } from "react";
import { AddressContext, updateDeliveryArea, MainContext } from "../../helpers";
import { produce } from "immer";
import * as _ from "lodash";
import { addressType } from "@/lib/profile/slices/address-slice";

export const AddressFooter = () => {
  const mainContext = useContext(MainContext);
  const addressContext = useContext(AddressContext);
  if (!mainContext || !addressContext) return null;

  return (
    <div className="flex justify-between w-full mt-3">
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onPress={() => {
            addressContext.setConfig(
              produce((draft) => {
                draft.details = mainContext.config.address;
                draft.accordionVal = new Set([]);
              }),
            );
            mainContext.setConfig(
              produce((draft) => {
                draft.selectedStage = null;
              }),
            );
          }}
          size="sm"
          className={`p-3 ${styles["hover-text-white"]}`}
          color="warning"
        >
          Cancel
        </Button>
      </div>

      <Button
        className="cursor-pointer p-3"
        color="primary"
        size="sm"
        variant="solid"
        onPress={() => {
          const addressDetails = addressContext.config.details;

          const updateDetails = _.pick(addressDetails, [
            "latitude",
            "longtitude",
            "addressType",
            "addressLine1",
            "addressLine2",
            "otherAddress",
          ]);
          updateDeliveryArea(
            mainContext.config.checkoutId as number,
            {
              ...updateDetails,
              addressType: updateDetails.addressType as addressType,
            },
            () => {
              mainContext.setConfig(
                produce((draft) => {
                  draft.address = addressDetails;
                  draft.selectedStage = null;
                }),
              );
              addressContext.setConfig(
                produce((draft) => {
                  draft.accordionVal = new Set([]);
                }),
              );
            },
          );
        }}
        endContent={<IoSaveSharp />}
      >
        Save{" "}
      </Button>
    </div>
  );
};
