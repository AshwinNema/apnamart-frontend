import { MarkerWithoutHeader } from "@/app/_custom-components";
import { MainMap } from "@/app/_custom-components/leaflet/map-component";
import { subDetailsViewerProps } from "@/app/admin/merchants/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { DivIcon } from "leaflet";
import { useMemo } from "react";
import { renderToString } from "react-dom/server";
import { Marker } from "react-leaflet";

export const AddressDetailsTable = ({
  details,
}: {
  details: subDetailsViewerProps["details"];
}) => {
  const addressDetails = [
    ["Shop No/Floor/Street Address", details.addressLine1],
    ["Area/ Colony/ State/ Province", details.addressLine2],
    ["Pin Code", details.pinCode],
  ];
  return (
    <Table hideHeader aria-label="Address details">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
      </TableHeader>
      <TableBody>
        {addressDetails.map(([header, info], index) => {
          return (
            <TableRow key={index}>
              <TableCell>{header}</TableCell>
              <TableCell>{info}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const BusinessLocation = ({
  details,
}: {
  details: subDetailsViewerProps["details"];
}) => {
  const icon = useMemo(() => {
    let iconHtml = renderToString(<MarkerWithoutHeader />);
    return new DivIcon({
      html: iconHtml,
    });
  }, []);
  return (
    <MainMap
      center={[details.latitude, details.longtitude]}
      zoom={16}
      className="h-[40vh] min-h-[250px]"
      scrollWheelZoom={true}
    >
      <Marker position={[details.latitude, details.longtitude]} icon={icon} />
    </MainMap>
  );
};
