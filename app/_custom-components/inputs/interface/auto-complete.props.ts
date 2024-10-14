import { HTTP_METHODS } from "@/app/_services";
import { autoCompleteListItem } from ".";

// This is complete documentation of autocomplete. There are following props that are passed in autocomplete:

// label: label of the autocomplete;
// size?: optional size of the autocomplete;
// variant?: optional variant of the autocomplete;
// color?: optional color of the autocomplete;
// onSelectionChange: (key: string | number | null) => any; to pass changed value to the main handler
// list?:optional list for the autocomplete in case of static list or component's api should not be used for getting list;
// method?: optional method of the api that has to be called to get the list;
// url?: optional url for the api that has to be called to get list data;
// processLogic?: This is an optional method that needs to be passed when fetching api data to get state values for the autocomplete
// Example for processLogic function
// (res) => {
//   if (!res) return { data: [], inputVal: "", selectedKey: null };
//   let inputVal: string = "",
//     selectedKey: string | null = null;
//   const data = res.map(
//     (item: { id: number; name: string; photo: string }) => {
//       if (
//         (mainConfig.categoryId || modalDetails?.category?.id) ==
//         item.id
//       ) {
//         inputVal = item.name;
//         selectedKey = `${item.id}`;
//       }
//       return {
//         id: item.id,
//         label: item.name,
//         photo: item.photo,
//       };
//     },
//   );
//   return { data, inputVal, selectedKey };
// }
// isClearable?: optional boolean to set whether we can clear autocomplete;
// labelPlacement?: optional parameter for setting label placement for autocomplete;
// fullWidth?: optional parameter for setting whether width of autocomplete should be full or not;
// allowsCustomValue?: optional parameter for allowing allowsCustomValue in autocomplete;
// selectedKey?: optional selected key that can be passed if default key should not be used;
// inputValue

// Note -
// 1. There are 2 ways to set list items here
//    1.1. Through passing url - Please pass method (in case method is different than GET) and processLogic for processing logic and getting proper list
//    1.2. Passing complete list - The list can be static or dynamic.
// 2. Also if you are passing selectedKey as prop to get control of autocomplete please pass inputVal to avoid abrupt behviour
// 3. If you are loading data on onSelection, the auto complete items bar reopens when data is loaded and input is focussed. If you want to avoid this behaviour please do consider disabling reloading by passing showLoader: false in makeDataRequest in last parameter
export interface AutoCompleteProps {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onSelectionChange: (key: string | number | null) => any;
  list?: autoCompleteListItem[];
  method?: HTTP_METHODS;
  url?: string;
  processLogic?: (res: any) => {
    data: autoCompleteListItem[];
    inputVal: string;
    selectedKey: string | null;
  };
  isClearable?: boolean;
  labelPlacement?: "inside" | "outside" | "outside-left";
  fullWidth?: boolean;
  allowsCustomValue?: boolean;
  selectedKey?: string | null;
  inputVal?: string;
  setInputVal?: (val: string) => void;
}
