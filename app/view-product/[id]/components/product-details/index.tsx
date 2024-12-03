import { useContext } from "react";
import { MainContext } from "../../helpers";
import { Description, DescriptionDetails } from "./description";

export const ProductDetails = () => {
  const context = useContext(MainContext);
  if (!context) return null;
  const {
    config: { details },
  } = context;
  const description = details?.description?.details;
  const specification = details?.specification;

  return (
    <div className="mb-3">
      <div className="text-lg font-normal">{details?.name}</div>
      <div className="my-5 text-3xl font-medium">
        {!!details?.price && <>₹{details?.price}</>}
      </div>

      {!!details?.highlights?.length && (
        <div className="flex gap-20 w-full">
          <div className="text-leadText text-sm "> Highlights</div>
          <div>
            <ul className="list-disc">
              {details?.highlights.map((item, index) => {
                return (
                  <li className="" key={index}>
                    {item}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
          <div></div>
        </div>
      )}

      {!!description && <Description description={description} />}
      {!!specification && (
        <div className="max-w-[90%]">
          {typeof specification === "string" ? (
            <div className="flex gap-10 mt-10">
              <div className="text-leadText">Specifications</div>
              <div>{specification}</div>
            </div>
          ) : (
            <div>
              <div className="mt-5 font-medium text-2xl border-styledBorder border-[0.5px] border-solid p-2">
                Specification
              </div>
              {specification.map((stageDetails) => {
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
                    <DescriptionDetails details={stageDetails.keyVals} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
