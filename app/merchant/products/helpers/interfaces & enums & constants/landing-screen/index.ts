import { columns } from "@/app/_custom-components";

export * from "./queried-product-data";

export const getTableColumns = () => {
  const columns: columns[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "item.name",
      label: "Item Name",
    },
    {
      key: "category.name",
      label: "Category Name",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "allowedUnitsPerOrder",
      label: "Allowed Units Per Order",
    },
    {
      key: "available",
      label: "Is product on sale?",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return columns;
};
