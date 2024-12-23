import { ImageComponent } from "@/app/_custom-components";
import { deletedImgProps } from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@nextui-org/react";
import { MdSettingsBackupRestore } from "react-icons/md";
import useConfigManager from "./useConfigManager";
import { useRef } from "react";

export const DeletedImg = ({
  imageDetails,
  config,
  handleImageIntersection,
  index,
}: deletedImgProps) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [handleImgRestore] = useConfigManager(
    config,
    containerRef,
    handleImageIntersection,
    index,
    imageDetails,
  );
  return (
    <div ref={containerRef} className="flex items-center min-w-[250px]">
      <ImageComponent
        src={imageDetails.url}
        width={200}
        height={200}
        alt="Deleted image"
      />
      <Tooltip color="secondary" content={"Restore Image"}>
        <Button
          className="mt-3 bg-transparent"
          onPress={() => {
            handleImgRestore();
          }}
          radius="full"
        >
          <MdSettingsBackupRestore className="scale-[2]" />
        </Button>
      </Tooltip>
    </div>
  );
};
