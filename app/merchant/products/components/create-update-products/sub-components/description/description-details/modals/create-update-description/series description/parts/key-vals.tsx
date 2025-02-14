import {
  specificationKeyValState,
  descriptionKeyValProps,
  updateSeriesDescription,
  deleteSeriesDescription,
} from "@/app/merchant/products/helpers";
import { useCallback, useState } from "react";
import { TextInput } from "@/app/_custom-components";
import { FaEdit } from "react-icons/fa";
import { setNestedPath } from "@/app/_utils";
import { SiTicktick } from "react-icons/si";
import { Tooltip } from "@heroui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
export const DescriptionKeyVal = ({
  keyVal,
  setCreateUpdateDescriptionState,
}: descriptionKeyValProps) => {
  const [config, setConfig] = useState<specificationKeyValState>({
    isReadOnly: true,
    key: keyVal.key,
    val: keyVal.val,
    id: keyVal.id,
  });

  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  return (
    <li className="mt-5">
      <div className="flex justify-between items-center gap-3 ">
        <div>
          <TextInput
            value={config.key}
            setData={setData("key")}
            label="Feature key"
            placeholder="Feature key"
            isReadOnly={config.isReadOnly}
          />{" "}
        </div>
        <div>-</div>
        <div>
          <div className="flex items-center gap-3">
            <TextInput
              value={config.val}
              setData={setData("val")}
              label="Feature value"
              placeholder="Feature value"
              isReadOnly={config.isReadOnly}
            />
            <Tooltip
              classNames={{ content: ["text-white"] }}
              color="warning"
              content={"Update specification feature/value"}
            >
              <span>
                {config.isReadOnly ? (
                  <FaEdit
                    onClick={() => setData("isReadOnly")(false)}
                    className="fill-warningTheme scale-[1.4] cursor-pointer"
                  />
                ) : (
                  <SiTicktick
                    onClick={() => {
                      updateSeriesDescription(
                        config,
                        setCreateUpdateDescriptionState,
                        setData,
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
                    deleteSeriesDescription(
                      setCreateUpdateDescriptionState,
                      keyVal.id,
                    );
                  }}
                  className="fill-dangerTheme cursor-pointer scale-[1.2]"
                />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </li>
  );
};
