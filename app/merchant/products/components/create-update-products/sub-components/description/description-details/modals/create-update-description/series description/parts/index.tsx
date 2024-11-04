import {
  CreateUpdateDescriptionContext,
  seriesDescription,
  uploadedImgDetails,
} from "@/app/merchant/products/helpers";
import { produce } from "immer";
import { useContext } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { ImageComponent } from "@/app/_custom-components";
import { TiDelete } from "react-icons/ti";

export * from "./create-update-inputs";
export * from "./key-vals";
export * from "./add-new-description-btns";

export const UploadedImage = ({
  uploadedImg,
}: {
  uploadedImg?: uploadedImgDetails | null;
}) => {
  const mainDescriptionContext = useContext(CreateUpdateDescriptionContext);
  if (!mainDescriptionContext || !uploadedImg) return null;
  const { setConfig } = mainDescriptionContext;

  return (
    <div className="flex justify-center items-center gap-3">
      <ImageComponent
        width={300}
        height={300}
        src={uploadedImg?.url}
        alt={"Uploaded image"}
      />
      <Tooltip color="danger" content="Remove uploaded image">
        <Button
          onPress={() => {
            setConfig(
              produce((draft) => {
                const details = draft.details as seriesDescription;
                details.deletedUploadedImg = produce(
                  details.uploadedImg,
                  () => {},
                );
                details.uploadedImg = null;
              }),
            );
          }}
          className="bg-transparent"
        >
          <TiDelete className="fill-dangerTheme scale-[2.2]" />
        </Button>
      </Tooltip>
    </div>
  );
};
