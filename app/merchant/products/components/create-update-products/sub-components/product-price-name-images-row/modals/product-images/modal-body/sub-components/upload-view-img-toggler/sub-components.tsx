import { ProductImgsModalContext } from "@/app/merchant/products/helpers";
import { Button, Tooltip } from "@heroui/react";
import { useContext } from "react";
import { MdGridView } from "react-icons/md";
import { ImUpload2 } from "react-icons/im";
import { produce } from "immer";

export const MainViewToggler = () => {
  const modalContext = useContext(ProductImgsModalContext);
  if (!modalContext) return null;
  const { config, setConfig, uploadRef } = modalContext;
  return (
    <>
      {
        <Tooltip
          color="secondary"
          content={`${config.view === "upload images" ? "View already uploaded images" : "Upload images"}`}
        >
          <Button
            onClick={() => {
              const files = uploadRef?.current?.cachedFileArray || [];
              setConfig(
                produce((draft) => {
                  switch (draft.view) {
                    case "upload images":
                      draft.cachedFiles.push(...files);
                      uploadRef.current = null;
                      break;

                    default:
                      break;
                  }

                  draft.view =
                    draft.view === "view images"
                      ? "upload images"
                      : "view images";
                }),
              );
            }}
            className="bg-transparent"
          >
            {config.view === "upload images" ? (
              <MdGridView className="scale-150" />
            ) : (
              <ImUpload2 className="scale-150" />
            )}
          </Button>
        </Tooltip>
      }
    </>
  );
};
