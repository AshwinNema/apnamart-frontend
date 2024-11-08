import { TableActions } from "@/app/_custom-components";
import {
  MainCreateUpdateProductContext,
  openUpdateSpecificationModalWithDetails,
} from "@/app/merchant/products/helpers";
import { CardBody, Divider } from "@nextui-org/react";
import { Fragment, useContext } from "react";
import { produce } from "immer";
import { successToast } from "@/app/_utils";
import { TableKeyVal } from "@/app/merchant/products/components/common-components";

export const SpecificationPointers = ({
  openCreateUpdateModal,
}: {
  openCreateUpdateModal: () => void;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  if (!mainContext) return null;
  const { config, setConfig } = mainContext;
  const { specifications } = config;
  if (!Array.isArray(specifications)) return null;
  return (
    <>
      {specifications.map((specification, index) => {
        const isLastIndex = index === specifications.length - 1;
        return (
          <Fragment key={specification.id}>
            <CardBody className="overflow-y-visible min-w-max">
              <div className="ml-3">
                {specification.header ? (
                  <div className=" font-bold">
                    {specification.header}
                  </div>
                ) : null}
                <div className="flex justify-between items-center gap-3 mr-2">
                  <TableKeyVal details={specification.keyVals} />
                  <div>
                    <TableActions
                      onClick={() =>
                        openUpdateSpecificationModalWithDetails(
                          specification,
                          setConfig,
                          openCreateUpdateModal,
                        )
                      }
                      onDelete={(onClose) => {
                        setConfig(
                          produce((draft) => {
                            if (!Array.isArray(draft.specifications)) return;
                            draft.specifications = draft.specifications.filter(
                              (details) => details.id !== specification.id,
                            );
                          }),
                        );
                        successToast({
                          msg: "Pointer specification deleted successfully",
                        });
                        onClose();
                      }}
                      editToolTipColor="warning"
                      editTooltipText="Update pointer"
                      deleteToolTipText="Delete pointer"
                      updateToolTipClass="fill-warningTheme text-white"
                      deleteModalHeadertext="Delete Pointer"
                      editIconClass="fill-warningTheme"
                    />
                  </div>
                </div>
                {!isLastIndex ? <Divider /> : null}
              </div>
            </CardBody>
          </Fragment>
        );
      })}
      {!specifications.length && (
        <CardBody>
          <div className="font-bold">
            No specification pointers found. Please add pointers
          </div>
        </CardBody>
      )}
    </>
  );
};
