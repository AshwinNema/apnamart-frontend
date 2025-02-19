import { Autocomplete, AutocompleteItem, Avatar } from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import * as _ from "lodash";
import { useCallback, useRef, useState } from "react";
import {
  autoCompleteListItem,
  AutoCompleteInputSearchProps,
} from "./interface";

export const AutoCompleteComponent = ({
  getListItems,
  label,
  size = "md",
  variant = "flat",
  color = "default",
  onSelectionChange,
  onInputClear,
}: AutoCompleteInputSearchProps): React.JSX.Element => {
  const trackSelection = useRef(false);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  const [itemList, setItemList] = useState<autoCompleteListItem[]>([]);
  const getData = useCallback(
    _.debounce(async (input: string): Promise<autoCompleteListItem[]> => {
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        return [];
      }
      const items = await getListItems(trimmedInput);
      setItemList(items);
      return items;
    }, 500),
    [],
  );

  const asyncList = useAsyncList({
    async load({
      filterText,
      items,
    }): Promise<{ items: autoCompleteListItem[] }> {
      const input = filterText as string;
      const trimmedText = input?.trim();
      if (!trimmedText) {
        setItemList([]);
        onInputClear && onInputClear();
        return { items: [] };
      }
      if (trackSelection.current) {
        trackSelection.current = false;
        const itemList = items as autoCompleteListItem[];
        return { items: itemList };
      }
      const itemList = (await getData(trimmedText)) || [];
      return { items: itemList };
    },
  });

  return (
    <>
      <Autocomplete
        label={label}
        variant={variant}
        ref={autoCompleteRef}
        allowsEmptyCollection={false}
        size={size}
        color={color}
        inputValue={asyncList.filterText}
        isLoading={asyncList.isLoading}
        allowsCustomValue
        items={itemList}
        onInputChange={(val: string) => {
          asyncList.setFilterText(val);
        }}
        onSelectionChange={(key) => {
          key && onSelectionChange(key);
          trackSelection.current = true;
          autoCompleteRef.current!.blur();
        }}
      >
        {itemList.map((item) => {
          return (
            <AutocompleteItem
              startContent={
                <>
                  {item.photo ? (
                    <Avatar
                      alt={item.label}
                      className="w-6 h-6"
                      src={item.photo}
                    />
                  ) : null}
                </>
              }
              key={item.id}
            >
              {item.label}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>
    </>
  );
};

export default AutoCompleteComponent;
