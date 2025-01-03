export const backendService = `${process.env.NEXT_PUBLIC_BACKEND_URL}v2/`;

export const category = {
  CREATE_CATEGORY: `${backendService}category`,
  UPDATE_CATEGORY: `${backendService}category/`,
  QUERY_CATEGORIES: `${backendService}category`,
  UPDATE_CATEGORY_IMAGE: `${backendService}category/image/`,
  DELETE_CATEGORY: `${backendService}category/`,
  SEARCH_CATEGORY_BY_NAME: `${backendService}category/search-by-name`,
  CATEGORY_LIST: `${backendService}category/list`,
};

export const subcategory = {
  CREATE_SUB_CATEGORY: `${backendService}subcategory`,
  UPDATE_SUB_CATEGORY: `${backendService}subcategory/`,
  QUERY_SUB_CATEGORIES: `${backendService}subcategory`,
  UPDATE_SUB_CATEGORY_IMAGE: `${backendService}subcategory/image/`,
  DELETE_SUB_CATEGORY: `${backendService}subcategory/`,
  SEARCH_SUB_CATEGORY_BY_NAME: `${backendService}subcategory/search-by-name`,
  SUB_CATEGORY_LIST: `${backendService}subcategory/list`,
};

export const items = {
  CREATE_ITEM: `${backendService}item`,
  UPDATE_ITEM: `${backendService}item/`,
  QUERY_ITEMS: `${backendService}item`,
  UPDATE_ITEM_IMAGE: `${backendService}item/image/`,
  DELETE_ITEM: `${backendService}item/`,
  SEARCH_ITEM_BY_NAME: `${backendService}item/search-by-name`,
  GET_ITEM_FILTERS_BY_ITEM_ID: `${backendService}item/item-filter/by-item-id/`,
  ITEM_LIST: `${backendService}item/list`,
};

export const product = {
  CREATE_PRODUCT: `${backendService}product`,
  QUERY_MERCHANT_PRODUCTS: `${backendService}product/by-merchant`,
  DELETE_PRODUCT_BY_ID: `${backendService}product/`,
  SELECTED_PRODUCT_FILTERS_BY_ID: `${backendService}product/selected-filters/`,
  UPDATE_PRODUCT: `${backendService}product/`,
  QUERY_CUSTOMER_PRODUCTS_UNLOGGED: `${backendService}product/by-customer-not-logged-in`,
  QUERY_CUSTOMER_PRODUCTS_LOGGED: `${backendService}product/by-customer-logged-in`,
  BY_PRODUCT_ID_NOT_LOGGED_IN: `${backendService}product/by-id-not-logged-in/`,
  BY_PRODUCT_ID_LOGGED_IN: `${backendService}product/by-id-logged-in/`,
};
