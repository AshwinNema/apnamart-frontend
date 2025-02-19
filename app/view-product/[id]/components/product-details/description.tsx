import { ImageComponent } from "@/app/_custom-components";
import {
  descriptionStage,
  queriedProduct,
  uploadedImgDetails,
} from "@/app/merchant/products/helpers";
import styles from "../../styles.module.css";
import { MainContext } from "../../helpers";
import { useContext } from "react";

export const DescriptionDetails = ({
  details,
}: {
  details: descriptionStage["details"];
}) => {
  return (
    <div className="text-sm">
      {typeof details === "string" ? (
        details
      ) : (
        <ul className={`list-disc w-full `}>
          {details.map((pointer) => {
            return (
              <li
                key={pointer.id}
                className={`break-all ${styles["descriptionGrid"]}`}
              >
                <div>{pointer.key}</div>
                <div>{pointer.val}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const Description = ({
  description,
}: {
  description: queriedProduct["description"]["details"];
}) => {
  const DescriptionPhoto = ({ photo }: { photo: uploadedImgDetails }) => {
    return (
      <div className="relative">
        <ImageComponent
          width={300}
          height={200}
          className="min-w-[100px]"
          src={photo.url}
          alt="Description photo"
        />
      </div>
    );
  };
  const context = useContext(MainContext);
  if (!context) return null;
  return (
    <div className={`${context.config.innerWidth > 800 && "max-w-[90%]"}`}>
      {typeof description === "string" ? (
        <div className="flex gap-10 mt-10">
          <div className="text-leadText">Description</div>
          <div>{description}</div>
        </div>
      ) : (
        <div>
          <div className="mt-5 font-medium text-2xl border-styledBorder border-[0.5px] border-solid p-2">
            Product Description
          </div>
          <div>
            {description.map((stageDetails, index) => {
              const { photo } = stageDetails;
              const details = (
                <DescriptionDetails details={stageDetails.details} />
              );
              return (
                <div
                  className={`border-styledBorder border-[0.5px] border-solid p-2`}
                  key={stageDetails.id}
                >
                  {!!stageDetails.header && (
                    <div className="font-normal text-xl mb-3">
                      {stageDetails.header}
                    </div>
                  )}

                  <div
                    className={`${!!photo && "flex justify-between gap-2 items-center"}`}
                  >
                    {photo && index % 2 == 0 && <>{details}</>}
                    {photo && <DescriptionPhoto photo={photo} />}
                    {photo && index % 2 == 1 && <>{details}</>}
                    {!photo && details}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
