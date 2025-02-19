import { subCategory } from "@/lib/main/slices/product-menu/product-menu.slice";
import {
  EventLoader,
  ImageComponent,
  loaderEvents,
  useEventLoaderEmitter,
} from "@/app/_custom-components";
import useConfigManager from "./useConfigManager";

export const MobileMenu = () => {
  const [config] = useConfigManager();
  const eventEmitter = useEventLoaderEmitter();

  const SubCategoryRow = ({ row }: { row: subCategory[] }) => {
    return (
      <div className="flex gap-3">
        {row.map((details) => {
          return (
            <div
              key={details.id}
              className={`cursor-pointer min-w-[150px]`}
              onClick={() => {
                eventEmitter.next({
                  type: loaderEvents.routeNavigation,
                  route: `/search/by-subcategory/${details.id}`,
                });
              }}
            >
              <div className="flex justify-center">
                <ImageComponent
                  className="rounded-full"
                  width={50}
                  height={50}
                  src={details.photo}
                  alt="Category photo"
                />
              </div>
              <div className="flex justify-center break-all text-xs w-full">
                {details.name}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          maxWidth: `${config.innerWidth}px`,
        }}
        className=" overflow-x-scroll"
      >
        <SubCategoryRow row={config.row1} />
        <SubCategoryRow row={config.row2} />
      </div>
      <EventLoader emitter={eventEmitter} />
    </>
  );
};
