import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils";
import { setMainConfig } from "../interfaces & enums & constants";

export * from "./create-update-product";
export const queryProducts = (
  query: {
    page: number;
    limit: number;
    id?: number;
  },
  setConfig: setMainConfig,
) => {
  makeDataRequest(
    HTTP_METHODS.GET,
    `${appEndPoints.QUERY_PRODUCTS}`,
    undefined,
    query,
  )
    .then((res) => {
      if (!res) return;
      setConfig((prevConfig) => {
        return {
          ...prevConfig,
          ...res,
        };
      });
    })
    .catch((err) => {
      console.log(err, "this is the err");
    });
};
