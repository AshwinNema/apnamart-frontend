import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils/endpoints";
import { AutoCompleteInputSearch as AutoCompleteComponent } from "@/app/_custom-components/inputs";
import { useProductDispatch, useProductSelector } from "@/lib/product/hooks";
import { setId, tabKeys } from "@/lib/product/slices/component-details.slice";
import { updateTableData } from "@/lib/product/slices/table.slice";

export default function Autocomplete() {
  const tab = useProductSelector((state) => state.componentDetails.tab);
  const dispatch = useProductDispatch();
  const getInputSearch = (name: string) => {
    let url = "";
    switch (tab) {
      case tabKeys.category:
        url = appEndPoints.SEARCH_CATEGORY_BY_NAME;
        break;

      case tabKeys.subCategory:
        url = appEndPoints.SEARCH_SUB_CATEGORY_BY_NAME;
        break;

      case tabKeys.items:
        url = appEndPoints.SEARCH_ITEM_BY_NAME;
        break;

      default:
        break;
    }

    return makeDataRequest(HTTP_METHODS.GET, url, undefined, { name })
      .then((res) => {
        if (!res) return [];
        return res.map((item: { id: number; name: string; photo: string }) => {
          return {
            id: item.id,
            label: item.name,
            photo: item.photo,
          };
        });
      })
      .catch(() => []);
  };
  return (
    <AutoCompleteComponent
      getListItems={(name: string) => getInputSearch(name)}
      label="Search by name"
      size="sm"
      color="primary"
      onSelectionChange={(id) => {
        dispatch(setId(id));
        dispatch(updateTableData({ page: 1 }));
      }}
      variant="faded"
      onInputClear={() => {
        dispatch(setId(null));
      }}
    />
  );
}
