import { Button, ModalFooter } from "@nextui-org/react";
import { bodyState, createUpdateData, MainModalContext } from "../../helper";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import {
  setDetails,
  tabKeys,
} from "@/lib/product/slices/component-details.slice";
import { useContext } from "react";

const Footer = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useProductDispatch();
  const refreshData = useProductSelector(
    (state) => state.componentDetails.refreshData,
  );
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const mainData = useContext(MainModalContext);
  if (!mainData) return null;
  const { config, setMainData } = mainData;
  return (
    <ModalFooter>
      {config.bodyState === bodyState.details && (
        <Button fullWidth color="danger" variant="flat" onPress={onClose}>
          Cancel
        </Button>
      )}

      {tab === tabKeys.items && (
        <Button
          fullWidth
          color="warning"
          onPress={() => {
            setMainData("bodyState")(
              config.bodyState === bodyState.details
                ? bodyState.itemFilters
                : bodyState.details,
            );
          }}
          variant="flat"
        >
          View{" "}
          {config.bodyState === bodyState.details
            ? "Item Filters"
            : "Main Details"}
        </Button>
      )}

      {config.bodyState === bodyState.details && (
        <Button
          className="text-white"
          onPress={() =>
            createUpdateData({
              config,
              tab,
              successCallback: () => {
                dispatch(
                  setDetails({
                    refreshData: !refreshData,
                    closeModal: true,
                  }),
                );
              },
            })
          }
          fullWidth
          color="success"
        >
          {config?.id ? "Update" : "Create"}
        </Button>
      )}
    </ModalFooter>
  );
};

export default Footer;
