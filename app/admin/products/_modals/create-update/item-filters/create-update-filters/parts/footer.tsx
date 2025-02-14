import { Button, Checkbox } from "@heroui/react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoColorFilterSharp } from "react-icons/io5";
import { RiColorFilterFill } from "react-icons/ri";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  createUpdateItemState,
  getItemFilterMainBtnText,
  MainModalContext,
  FilterContext,
  mainOptionHandler,
  mainItemFilterHandler,
  getCreateUpdateItemConfig,
} from "@/app/admin/products/helper";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";

const Footer = ({
  config,
  setConfig,
}: {
  config: createUpdateItemState;
  setConfig: Dispatch<SetStateAction<createUpdateItemState>>;
}) => {
  const mainItemFilterState = useContext(FilterContext);
  const centralState = useContext(MainModalContext);
  if (!mainItemFilterState || !centralState) return null;
  const { mainConfig, setMainConfig } = mainItemFilterState;
  const { config: centralConfig, setAllData } = centralState;

  return (
    <div className="flex flex-col gap-4 mt-4 mb-4">
      <Button
        startContent={<RiColorFilterFill />}
        variant="bordered"
        color="success"
        onPress={() => {
          mainConfig.createUpdateFilterOption
            ? mainOptionHandler(
                mainConfig.createUpdateFilterOption,
                config,
                setConfig,
                setMainConfig,
              )
            : mainItemFilterHandler(
                mainConfig.createUpdateFilter,
                config,
                setMainConfig,
                setAllData,
                centralConfig,
              );
        }}
      >
        {getItemFilterMainBtnText(
          mainConfig.createUpdateFilterOption,
          mainConfig.createUpdateFilter,
        )}
      </Button>

      {mainConfig.createUpdateFilterOption && (
        <Button
          color="secondary"
          variant="bordered"
          startContent={<RiArrowGoBackLine />}
          onPress={() => {
            setNestedPath(setConfig)("optionCreateUpdateName")("");
            setNestedPath(setMainConfig)("createUpdateFilterOption")(null);
          }}
        >
          Go Back
        </Button>
      )}
      <Button
        color="primary"
        startContent={<IoColorFilterSharp />}
        variant="bordered"
        onPress={() => {
          setConfig(getCreateUpdateItemConfig());
          setMultiplePaths(setMainConfig)([
            ["createUpdateFilter", null],
            ["createUpdateFilterOption", null],
          ]);
        }}
      >
        View All Filters
      </Button>
    </div>
  );
};

export default Footer;
