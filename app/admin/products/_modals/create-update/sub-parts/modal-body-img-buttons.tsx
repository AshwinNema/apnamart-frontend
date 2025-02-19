import { Button } from "@heroui/react";
import { infoToast } from "@/app/_utils/toast";
import { Dispatch, SetStateAction } from "react";
import { useProductSelector } from "@/lib/product/hooks";
import {
  defaultModalBodyConfig,
  tableDataDataElement,
  modalBodyconfig,
} from "../../../helper";

export const ModalImgButtons = ({
  config,
  setConfig,
  setModalCrtState,
  uploadFile,
}: {
  config: modalBodyconfig;
  setConfig: Dispatch<SetStateAction<modalBodyconfig>>;
  setModalCrtState: () => void;
  uploadFile: () => void;
}) => {
  const modalDetails = useProductSelector(
    (state) => state.modalDetails,
  ) as unknown as tableDataDataElement;
  return (
    <>
      {modalDetails?.photo ? (
        <div className="flex justify-center">
          {config.showImage ? (
            <Button
              onClick={() => {
                infoToast({
                  msg: (
                    <p>
                      Please browse your image and click on{" "}
                      <span className="font-bold">Upload Image</span> to upload
                      image or click on{" "}
                      <span className="font-bold">Cancel Upload</span> to cancel
                      image upload
                    </p>
                  ),
                });

                setConfig(defaultModalBodyConfig());
              }}
              color="primary"
            >
              Change Image
            </Button>
          ) : (
            <div className="flex gap-4">
              {config.showUpdateSaveBtn ? (
                <Button onClick={uploadFile} radius="full" color="primary">
                  Upload Image
                </Button>
              ) : null}
              <Button
                variant="solid"
                color="danger"
                radius="full"
                onClick={() => {
                  setModalCrtState();
                }}
              >
                Cancel Upload
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};
