import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { setNestedPath } from "@/app/_utils";

import {
  newRegistrationDetails,
  viewRegistrationdDetailsState,
} from "@/app/admin/merchants/helper";
import { getTableRows } from "../../../utils/";

export const RegistrationDetails = ({
  details,
}: {
  details: newRegistrationDetails;
}) => {
  const [config, setConfig] = useState<viewRegistrationdDetailsState>({
    subDetailsType: null,
  });
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  return (
    <div>
      <Table hideHeader aria-label="Merchant Registration Details">
        <TableHeader>
          <TableColumn>Column Name</TableColumn>
          <TableColumn>Column Details</TableColumn>
        </TableHeader>
        <TableBody>
          {getTableRows(details, (subDetailsType) => {
            setData("subDetailsType")(subDetailsType);
          }).map(([element, details], index) => {
            return (
              <TableRow key={index}>
                <TableCell>{element}</TableCell>
                <TableCell>{details}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
