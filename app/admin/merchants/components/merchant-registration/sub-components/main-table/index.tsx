import { PaginationComponent } from "@/app/_custom-components";
import { Fragment } from "react";
import { RegistrationDetailsCard } from "./registration-details-card";
import { setNestedPath } from "@/app/_utils";
import {
  merchantRegistrationSubComponentProps,
  newRegistrationDetails,
} from "@/app/admin/merchants/helper";

export const MainTable = ({
  config,
  setConfig,
  getData,
}: merchantRegistrationSubComponentProps<newRegistrationDetails>) => {
  const setData = setNestedPath(setConfig);
  if (config.selectedRegistrationDetails) return null;
  return (
    <>
      <div className="mb-3">
        {config.results.map((registrationDetails) => {
          return (
            <Fragment key={registrationDetails.id}>
              <RegistrationDetailsCard
                details={registrationDetails}
                setSelectedCard={(details) => {
                  setData("selectedRegistrationDetails")(details);
                }}
                config={config}
                getData={getData}
              />
            </Fragment>
          );
        })}
      </div>
      {config.totalResults ? (
        <PaginationComponent
          page={config.page}
          totalPages={config.totalPages}
          onChange={(page) => {
            getData(page);
            setData("page")(page);
          }}
        />
      ) : (
        <p className="font-bold flex justify-center">
          No new registration results found
        </p>
      )}
    </>
  );
};
