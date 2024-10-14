"use client";
import { HTTP_METHODS, makeDataRequest } from "@/app/_services";
import { appEndPoints } from "@/app/_utils/endpoints";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import * as _ from "lodash";
import { useCallback, useRef, useState } from "react";
import { location, processQueryLocations } from "../../address/utils";

export default function LocationAutoCompleteInput({
  setLocation,
}: {
  setLocation: (pos: [number, number], address: String) => void;
}) {
  const [locationList, setLocationList] = useState<location[]>([]);
  const trackSelection = useRef(false);

  const getData = useCallback(
    _.debounce(async function (input: string) {
      try {
        const data = await makeDataRequest(
          HTTP_METHODS.GET,
          appEndPoints.QUERY_MAP_LOCATION,
          undefined,
          {
            input,
          },
          {
            showLoader: false,
            throwErr: false,
            showToast: false,
          },
        );

        const locations = processQueryLocations(data.predictions);
        setLocationList(locations);
      } catch (err) {}
    }, 500),
    [],
  );
  const asyncList = useAsyncList({
    async load({ filterText }) {
      const input = filterText as string;
      const trimmedText = input?.trim();
      if (trackSelection.current) {
        trackSelection.current = false;
        return { items: [] };
      }
      if (!trimmedText) {
        setLocationList([]);
        return { items: [] };
      }
      getData(input);
      return {
        items: [],
      };
    },
  });

  return (
    <>
      <Autocomplete
        label="Select your location"
        inputValue={asyncList.filterText}
        isLoading={asyncList.isLoading}
        allowsCustomValue
        items={asyncList.items as location[]}
        onInputChange={(options) => {
          asyncList.setFilterText(options);
        }}
        onSelectionChange={(key) => {
          if (key) {
            const selectedLocation = locationList.filter(
              (location) => location.id === key,
            )[0];

            setLocation(
              [selectedLocation.lat, selectedLocation.lng],
              selectedLocation.label,
            );
          }

          trackSelection.current = true;
        }}
      >
        {locationList.map((location: location) => {
          return (
            <AutocompleteItem key={location.id}>
              {location.label}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>
    </>
  );
}
