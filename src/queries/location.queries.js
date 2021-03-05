import { useQuery, useQueryClient } from "react-query";
import { useMemo } from "react";

const AWS_HOST = process.env.REACT_APP_AWS_HOST;

const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    } else {
      resolve(null);
    }
  }).then(({ lon, lat }) => {
    if (lon && lat) {
      return fetch(`${AWS_HOST}/searchlocation?lat=${lat}&lon=${lon}`)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    }
  });
};

const getLocationAutoComplete = async (query) => {
  if (query) {
    try {
      const response = await fetch(`${AWS_HOST}/searchcities?query=${query}`);
      const json = await response.json();
      return filterCities(json);
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};

const filterCities = (locations = []) =>
  locations.filter((location) => location.type === "city");

export const useLocationOptions = (input) => {
  const client = useQueryClient();
  const { data, isLoading, isError, status } = useQuery(
    ["locationAutoComplete", input],
    () => getLocationAutoComplete(input),
    {
      staleTime: 60000,
    }
  );

  const autoCompleteOptions = useMemo(
    () =>
      Array.prototype.map.call(data || [], (location) => ({
        label: location.display_name,
        value: location.place_id,
        data: location,
      })),
    [data]
  );

  const invalidateLocationAutoComplete = () => {
    client.invalidateQueries("locationAutoComplete");
  };

  return {
    autoCompleteOptions,
    isLoading,
    isError,
    status,
    invalidateLocationAutoComplete,
  };
};

export const useCurrentLocation = () => {
  const { data, isLoading, isError, status } = useQuery(
    ["currentLocation"],
    () => getCurrentLocation(),
    {
      staleTime: 6000,
    }
  );

  return { currentLocation: data, isLoading, isError, status };
};
