import {
  ProductHighlightModalContext,
  requiredStringValidation,
} from "@/app/merchant/products/helpers";
import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { setNestedPath, validateZodSchema } from "@/app/_utils";
import { SiTicktick } from "react-icons/si";
import { Tooltip } from "@heroui/react";
import { TextInput } from "@/app/_custom-components";
import { produce } from "immer";

export const HighlightPoint = ({ id, data }: { id: string; data: string }) => {
  const [pointStateDetails, setPointStateDetails] = useState({
    details: data,
    isReadOnly: true,
  });
  const setData = setNestedPath(setPointStateDetails);

  const modalContext = useContext(ProductHighlightModalContext);
  if (!modalContext) return null;
  const { setConfig } = modalContext;
  return (
    <div className="flex justify-between items-center gap-3">
      <TextInput
        value={pointStateDetails.details}
        setData={setData("details")}
        label="Highlight Pointer"
        placeholder="Enter details"
        isReadOnly={pointStateDetails.isReadOnly}
      />
      <Tooltip
        classNames={{ content: ["text-white"] }}
        color="warning"
        content={`Update highlighlight pointer`}
      >
        <span>
          {pointStateDetails.isReadOnly ? (
            <FaEdit
              onClick={() => setData("isReadOnly")(false)}
              className="fill-warningTheme scale-[1.4] cursor-pointer"
            />
          ) : (
            <SiTicktick
              onClick={() => {
                const { error, data } = validateZodSchema(
                  pointStateDetails.details,
                  requiredStringValidation("Highligh Pointer"),
                  true,
                );
                if (error || !data) return;
                setData("isReadOnly")(true);
                setConfig(
                  produce((draft) => {
                    const pointerIndex = draft.data.findIndex(
                      (item) => item.id === id,
                    );
                    if (pointerIndex != -1)
                      draft.data[pointerIndex].data = data as string;
                  }),
                );
              }}
              className="fill-successTheme scale-[1.2] cursor-pointer"
            />
          )}
        </span>
      </Tooltip>

      <Tooltip
        color="danger"
        classNames={{ content: ["text-white"] }}
        content={"Delete specification feature/value"}
      >
        <span>
          <RiDeleteBin6Fill
            onClick={() => {
              setConfig(
                produce((draft) => {
                  draft.data = draft.data.filter((item) => item.id !== id);
                }),
              );
            }}
            className="fill-dangerTheme cursor-pointer scale-[1.2]"
          />
        </span>
      </Tooltip>
    </div>
  );
};
