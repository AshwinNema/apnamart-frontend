import { fetchConfig, HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints, setKeyVal, setVal } from "@/app/_utils";

export const getItemsList = (
  query: { categoryId?: number },
  setData: setVal,
  clearList?: true,
  reqConfig?: fetchConfig,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    `${appEndPoints.ITEM_LIST}`,
    undefined,
    query,
    reqConfig,
  )
    .then((res) => {
      if (!res) return;
      const data = res.map(
        (item: { id: number; name: string; photo: string }) => {
          return {
            id: item.id,
            label: item.name,
            photo: item.photo,
          };
        },
      );
      setData(data);
    })
    .catch((err) => {
      clearList && setData([]);
      console.log(err);
    });
};
