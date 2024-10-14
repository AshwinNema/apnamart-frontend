import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { setMultiplePaths, setNestedPath } from "@/app/_utils";
import {
  newRegistrationDetails,
  viewRegistrationdDetailsState,
} from "@/app/admin/merchants/helper";
import { getTableRows } from "../../../utils/";
import { SubDetailsViewer } from "./sub-details-viewer";
import { getAddress } from "@/app/profile/address/utils";

export const RegistrationDetails = ({
  details,
}: {
  details: newRegistrationDetails;
}) => {
  const [config, setConfig] = useState<viewRegistrationdDetailsState>({
    subDetailsType: null,
    address: "",
  });
  useEffect(() => {
    getAddress(
      { lat: details.latitude, lng: details.longtitude },
      setMultiplePaths(setConfig),
      false,
    );
  }, []);
  const setData = useCallback(setNestedPath(setConfig), [setConfig]);

  return (
    <div>
      <SubDetailsViewer
        details={details}
        subDetailsType={config.subDetailsType}
        clearSubDetailsType={() => {
          setData("subDetailsType")(null);
        }}
        address={config.address}
      />
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
