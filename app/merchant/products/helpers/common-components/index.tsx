import { GiCancel } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";

export const CancelUpdateKeyValIcons = ({
  type,
  onCancel,
  onSuccess,
}: {
  type: "new" | "edit";
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  return (
    <>
      <Tooltip
        color="success"
        content={<p>{type === "new" ? "Add new " : "update "} feature</p>}
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
              ? "adding new feature"
              : "updating the current feature"}
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
    </>
  );
};

export const TableKeyVal = ({
  details,
}: {
  details: { id: string; key: string; val: String }[];
}) => {
  return (
    <ul className="list-disc w-full">
      <Table aria-label="Description Pointer Details" hideHeader>
        <TableHeader>
          <TableColumn>Feature</TableColumn>
          <TableColumn>-</TableColumn>
          <TableColumn>Feature Value</TableColumn>
        </TableHeader>
        <TableBody>
          {details.map((descriptionDetails) => {
            return (
              <TableRow key={descriptionDetails.id}>
                <TableCell>
                  <li>{descriptionDetails.key}</li>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{descriptionDetails.val}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ul>
  );
};
