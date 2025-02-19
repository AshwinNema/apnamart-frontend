import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { Tooltip } from "@heroui/react";
import { createUpdateKetValIconConfig } from "../../helpers";

export const CancelUpdateKeyValIcons = ({
  type,
  onCancel,
  onSuccess,
  entity = "feature",
}: createUpdateKetValIconConfig) => {
  return (
    <div className="flex items-center gap-3">
      <Tooltip
        color="success"
        className="text-white"
        content={
          <p>
            {type === "new" ? "Add new " : "update "} {entity}
          </p>
        }
      >
        <span>
          <SiTicktick
            onClick={onSuccess}
            className="fill-successTheme scale-[1.2] cursor-pointer"
          />
        </span>
      </Tooltip>
      <Tooltip
        color="danger"
        content={
          <p>
            Cancel{" "}
            {type === "new"
              ? `adding new ${entity}`
              : `updating the current ${entity}`}
          </p>
        }
      >
        <span>
          <GiCancel
            onClick={onCancel}
            className="fill-dangerTheme scale-[1.2] cursor-pointer"
          />
        </span>
      </Tooltip>
    </div>
  );
};

export const TableKeyVal = ({
  details,
}: {
  details: { id: string; key: string; val: String }[];
}) => {
  return (
    <ul className="list-disc w-full">
      <div className="flex gap-3">
        <div className="flex flex-col">
          {details.map((descriptionDetails) => {
            return (
              <div
                className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal text-start"
                key={descriptionDetails.id}
              >
                <li>{descriptionDetails.key}</li>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {details.map((descriptionDetails) => {
            return (
              <div
                className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal text-start"
                key={descriptionDetails.id}
              >
                -
              </div>
            );
          })}
        </div>

        <div className="flex flex-col">
          {details.map((descriptionDetails) => {
            return (
              <div
                className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal text-start"
                key={descriptionDetails.id}
              >
                {descriptionDetails.val}
              </div>
            );
          })}
        </div>
      </div>
    </ul>
  );
};
