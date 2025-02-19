import { ImgViewer } from "@/app/_custom-components";
import {
  currentDescriptionModalProps,
  seriesDescription,
} from "@/app/merchant/products/helpers";
import { TableKeyVal } from "@/app/merchant/products/components/common-components";
import {
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CreateUpdateIcons } from "./sub-components";

export const PointerDescription = ({
  descriptionPoints,
  openCreateUpdateModal,
}: {
  descriptionPoints: seriesDescription[];
  openCreateUpdateModal: currentDescriptionModalProps["openCreateUpdateModal"];
}) => {
  return (
    <>
      {descriptionPoints.map((descriptionDetails) => {
        const { details, header, id, photo, uploadedImg } = descriptionDetails;
        return (
          <CardBody key={id} className="ml-3 overflow-y-visible">
            {header ? (
              <div className="flex justify-center font-bold">{header}</div>
            ) : null}
            <ImgViewer
              file={photo}
              uploadedImg={uploadedImg}
              alt="Pointer image"
            />
            <div className="flex justify-between items-center gap-3 mr-2">
              {typeof details === "string" ? (
                <>
                  <Table hideHeader aria-label="Hide table">
                    <TableHeader>
                      <TableColumn>Details</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={1}>
                        <TableCell>{details}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              ) : (
                <TableKeyVal details={details} />
              )}
              <CreateUpdateIcons
                descriptionDetails={descriptionDetails}
                openCreateUpdateModal={openCreateUpdateModal}
              />
            </div>
          </CardBody>
        );
      })}

      {!descriptionPoints.length ? (
        <CardBody>
          <div className="font-bold">
            No description pointers found. Please add pointers
          </div>
        </CardBody>
      ) : null}
    </>
  );
};
