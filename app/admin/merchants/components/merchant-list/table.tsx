import { UserInterface } from "@/lib/main/slices/user/user.slice";
import React, { useCallback } from "react";
import {
  getMerchantRegistrationStatusLabel,
  merchantListColumns,
  merchantTableProps,
} from "../../helper";
import { FaRegIdCard } from "react-icons/fa6";
import { Tooltip } from "@heroui/react";
import { PiStopCircleDuotone } from "react-icons/pi";
import { RenderTable } from "@/app/_custom-components";
import { SiTicktick } from "react-icons/si";

export const MerchantListTable = (props: merchantTableProps) => {
  const renderCell = useCallback(
    (data: UserInterface, columnKey: React.Key) => {
      const { merchantDetails } = data;
      const registrationStatus = getMerchantRegistrationStatusLabel(
        merchantDetails?.registrationStatus,
        !!merchantDetails?.isMerchantBlocked,
      );
      switch (columnKey) {
        case "name":
        case "email":
          return <div>{data[columnKey]}</div>;
        case "registrationStatus":
          return <div>{registrationStatus}</div>;
        case "actions":
          if (!merchantDetails) return <></>;
          return (
            <div className="flex gap-2 scale-[2] items-center justify-center">
              <Tooltip
                color="secondary"
                content={<>View registration details</>}
              >
                <span>
                  <FaRegIdCard
                    onClick={() => {
                      props.onClick(data, "view registration details");
                    }}
                    className="cursor-pointer"
                  />
                </span>
              </Tooltip>

              <Tooltip
                content={
                  <>
                    {merchantDetails.isMerchantBlocked
                      ? "Unblock merchant"
                      : "Block merchant"}
                  </>
                }
                color={
                  merchantDetails.isMerchantBlocked ? "secondary" : "danger"
                }
              >
                <span>
                  {merchantDetails.isMerchantBlocked ? (
                    <SiTicktick
                      onClick={() => {
                        props.onClick(data, "unblock merchant");
                      }}
                      className="cursor-pointer scale-[0.7]"
                    />
                  ) : (
                    <PiStopCircleDuotone
                      onClick={() => {
                        props.onClick(data, "block merchant");
                      }}
                      className="fill-dangerTheme cursor-pointer"
                    />
                  )}
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <></>;
      }
    },
    [],
  );
  if (props.config.selectedRegistrationDetails) return null;
  return (
    <RenderTable
      ariaLabel="Merchant List"
      isStriped={true}
      columns={merchantListColumns()}
      items={props.config.results}
      renderCell={renderCell}
      totalPages={props.config.totalPages}
      setPage={(page) => {
        props.setData("page")(page);
        props.queryData(page);
      }}
      emptyContent="No merchants found"
    />
  );
};
