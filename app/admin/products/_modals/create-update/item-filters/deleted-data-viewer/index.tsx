import { errorToast, successToast } from "@/app/_utils";
import { deletedItemDataViewerType } from "@/app/admin/products/helper";
import { Chip, Tooltip } from "@nextui-org/react";

interface deletedFilterViewer<T, U, V> {
  type: deletedItemDataViewerType;
  list: T[];
  restoreOption: (data: T) => void;
  restoreList: U[];
  optionMap: {
    [key: string]: T | V;
  };
}
// This component is used for viewing all the options that are deleted by the user when the user is updating the filter
export const DeletedDataViewer = function <
  T extends { id: number; name: string },
  U extends { name: string },
  V extends { id: number; name: string },
>({
  type,
  list,
  restoreOption,
  optionMap,
  restoreList,
}: deletedFilterViewer<T, U, V>) {
  if (!list.length) return null;
  const label =
    type === deletedItemDataViewerType.filter ? "Filter" : "Filter option";
  return (
    <>
      <div className="mt-5">
        <div className="font-bold text-rose-500 text-xs">
          Note: The following{" "}
          {type === deletedItemDataViewerType.filter ? "filters" : "options"}{" "}
          will be deleted permanently from the system on updating the item
        </div>

        <div className="mt-5 flex gap-4">
          {list.map((option) => {
            return (
              <Tooltip
                key={option.id}
                color="secondary"
                showArrow={true}
                content={
                  <div>
                    <div>
                      <div>Original Name - {optionMap[option.id].name}</div>
                      <div>Click on the option to restore</div>
                    </div>
                  </div>
                }
              >
                <Chip
                  onClick={() => {
                    const isDuplicate = !!restoreList.find(
                      (item) => item.name === option.name,
                    );
                    if (isDuplicate) {
                      errorToast({
                        msg: `Duplicate ${label.toLowerCase()} already present in the table. Kindly delete it first before restoring`,
                      });
                      return;
                    }
                    restoreOption(option);
                    successToast({
                      msg: `${label} restored successfully`,
                    });
                  }}
                  className="cursor-pointer"
                  radius="full"
                  variant="dot"
                  color="warning"
                  classNames={{
                    content: ["font-bold"],
                  }}
                >
                  {option.name}
                </Chip>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
};
