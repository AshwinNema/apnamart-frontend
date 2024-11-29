// for controlling what is shown in the create / update filter modal. details is the default state, In case of items, when we click on View All Item Filters we use itemFilters.
export enum bodyState {
  itemFilters = "Item Filters",
  details = "Details",
}

// In the modal when we are trying to create/update filter/ option, this controls what is happening. Refer ItemFilterConfig below for mpore details
export enum createUpdateFilterState {
  create = "create",
  update = "update",
}

// When we are viewing filters, this controls which table is being shown, main table contains all the filters. In case we are updating a filter, options table is being shown
export enum itemTableType {
  main = "main",
  options = "options",
}

// This is specific tp create/ update modal, item entity. When we update an item entity, we can delete its filters
// and filter options. Options that are stored in the database can be restored app/admin/products/_modals/create-update/item-filters/deleted-data-viewer/index.tsx
// This enum controls what is being currently deleted
export enum deletedItemDataViewerType {
  filter = "Filter",
  filterOption = "Filter Option",
}

export enum itemFilterType {
  price = "price",
  userMenu = "userMenu",
  normal = "normal",
}
