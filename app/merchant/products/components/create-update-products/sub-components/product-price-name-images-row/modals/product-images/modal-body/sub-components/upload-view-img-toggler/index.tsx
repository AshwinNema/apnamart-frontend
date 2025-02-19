import {
  MainCreateUpdateProductContext,
  ProductImgsModalContext,
  setProductImgsModalState,
} from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@heroui/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { MdAutoDelete } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { MainViewToggler } from "./sub-components";
import { produce } from "immer";

export const UploadViewImgToggler = ({
  viewImgsState,
  setViewImgsState,
  setConfig,
}: {
  viewImgsState: "uploaded" | "deleted";
  setViewImgsState: Dispatch<SetStateAction<"uploaded" | "deleted">>;
  setConfig: setProductImgsModalState;
}) => {
  const mainContext = useContext(MainCreateUpdateProductContext);
  const modalContext = useContext(ProductImgsModalContext);
  if (!mainContext || !modalContext) return null;
  const { config: mainConfig } = mainContext;
  const { config } = modalContext;
  return (
    <>
      {mainConfig.id && (
        <div className="flex justify-between">
          {config.view === "view images" ? (
            <>
              <div>
                {!!config.deletedImgs.length && (
                  <Tooltip
                    color="secondary"
                    content={`${viewImgsState === "uploaded" ? "View deleted images" : "View uploaded images"}`}
                  >
                    <span>
                      <Button
                        onPress={() => {
                          setConfig(
                            produce((draft) => {
                              draft.translateUploadImgsX = 0;
                              draft.translateDeletedImgsX = 0;
                            }),
                          );
                          setViewImgsState((prevView) => {
                            return prevView === "deleted"
                              ? "uploaded"
                              : "deleted";
                          });
                        }}
                        className="bg-transparent cursor-pointer"
                      >
                        {viewImgsState === "uploaded" ? (
                          <MdAutoDelete className="scale-150" />
                        ) : (
                          <GrOverview className="scale-150" />
                        )}
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="font-bold">
                {viewImgsState === "uploaded"
                  ? "Uploaded Images"
                  : "Deleted Images"}{" "}
              </div>
            </>
          ) : (
            <>
              <div> </div>
              <div> </div>
            </>
          )}

          <MainViewToggler />
        </div>
      )}
    </>
  );
};
