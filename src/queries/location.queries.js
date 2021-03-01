import { useQuery, useQueryClient } from "react-query";

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
      return fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.8782827ee41fddbc68cc44c10dfe33b0&lat=${lat}&lon=${lon}&format=json`
      )
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
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=pk.8782827ee41fddbc68cc44c10dfe33b0&&q=${query}&format=json`
      );
      const json = await response.json();
      return json;
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};

export const useLocationOptions = (input) => {
  const client = useQueryClient();
  const { data, isLoading, isError, status } = useQuery(
    ["locationAutoComplete", input],
    () => getLocationAutoComplete(input),
    {
      staleTime: 60000,
    }
  );

  const options = Array.prototype.map.call(data || [], (location) => ({
    label: location.display_name,
    value: location.place_id,
    data: location,
  }));

  const invalidateLocationAutoComplete = () => {
    client.invalidateQueries("locationAutoComplete");
  };

  return {
    options,
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
      staleTime: 1000 * 60 * 5,
    }
  );

  return { currentLocation: data, isLoading, isError, status };
};
