import { PaginationComponent } from "@/app/_custom-components";
import { Fragment, useContext } from "react";
import { MainStateContext } from "../../utils";
import { RegistrationDetailsCard } from "./registration-details-card";
import { setNestedPath } from "@/app/_utils";

export const MainTable = () => {
  const mainState = useContext(MainStateContext);
  if (!mainState) return null;
  const { config, setConfig, getData } = mainState;
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
