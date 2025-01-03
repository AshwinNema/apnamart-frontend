import { ImageComponent } from "@/app/_custom-components";
import { tabKeys } from "@/lib/product/slices/component-details.slice";

export const NameComponent = ({
  photo,
  name,
  alt = "category image",
}: {
  photo: string;
  name: string;
  alt?: string;
}) => {
  return (
    <div className="flex items-center gap-3 text-lg">
      {!!photo && (
        <ImageComponent
          width={100}
          height={100}
          src={photo}
          alt={alt}
          isBlurred={true}
        />
      )}{" "}
      <div>{name}</div>
    </div>
  );
};

export const getEmptyContent = (tab: tabKeys) => {
  return `No ${tab === tabKeys.category ? "categories" : "items"} found`;
};
