import { tabKeys } from "@/lib/product/slices/component-details.slice";
import { itemFilterType } from "./enums";
// Terminology -
// Filter Item - This is the main filter for the item
// Filter option - This is tthe option for the filter item

// base for filter item option. This is the basic state when we are creating/updating it in the modal, id is a string when it is created in the modal and after the data is stored in the database it becomes number i.e. id coming from database
export interface FilterItemOption {
  id: number | string;
  name: string;
}
// item option as per database
export interface DatabaseFilterItemOption extends Omit<FilterItemOption, "id"> {
  id: number;
}

// base for filter item as stored in the modal. id a string when it is first created in the modal, when data is received from the database, id becomes number
export interface FilterItem {
  id: number | string;
  name: string;
  options: FilterItemOption[];
  filterType: itemFilterType;
}
// filter item as per database
export interface DatabaseFilterItem
  extends Omit<Omit<FilterItem, "options">, "id"> {
  id: number;
  options: DatabaseFilterItemOption[];
}
// This is the filter options that is stored in the main modal state. deletedOptions are the options that are deleted by the user and are present in the database
export interface ModalFilterItem extends FilterItem {
  deletedOptions?: DatabaseFilterItemOption[];
}
// This represent the option that was deleted by the user in the modal but is present in the database
export interface ModalDeletedFilterItem extends DatabaseFilterItem {
  deletedOptions?: DatabaseFilterItemOption[];
}
// When we click on the view all filters, we see a table of items, this is the state of that table item, when we edit a filter there we see the same state.
export interface itemFilterTabletem {
  name: string;
  id: string | number;
}
// this is the tab option of the main entity tab
export interface tabOption {
  title: string;
  Content: (props: any) => React.JSX.Element;
  key: tabKeys;
}
// This is the newly created option that will be sent while updating/creating filter
interface CreateFilterItemOption extends Omit<FilterItemOption, "id"> {}
// In the api that we use for updating item, this contains the data for the newly created filter
export interface CreateFilterItem
  extends Omit<Omit<FilterItem, "id">, "options"> {
  options: CreateFilterItemOption[];
}
// Used with updateFilter contains the options that are being updated
interface UpdateFilterItemOption extends CreateFilterItemOption {
  id: number;
}
// When we try to create/ update an item entity, we also send filters, this represents the state of those filters
export interface updateFilter {
  id: number;
  name?: string;
  createOptions?: CreateFilterItemOption[];
  deleteOptions?: number[];
  updateOptions?: UpdateFilterItemOption[];
  filterType?: itemFilterType;
}
// MainModalState contains originalFilterItems that are the items that are stored in the database
export interface originalFilterItem
  extends Omit<DatabaseFilterItem, "options"> {
  options: {
    [key: string]: DatabaseFilterItemOption;
  };
}
