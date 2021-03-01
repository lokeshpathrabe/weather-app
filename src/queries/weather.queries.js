import { useQuery, useQueryClient } from "react-query";

const getCurrentLocationWeather = (lat, lon) => {
  if (lat && lon) {
    return fetch(
      `http://api.weatherapi.com/v1/current.json?key=c61f699e63cb43fa8a8112027202612&q=${lat},${lon}`,
      {
        method: "GET",
      }
    ).then((response) => {
      return response.json();
    });
  } else {
    return [];
  }
};

export const useWeatherByLocation = (lat, lon) => {
  const client = useQueryClient();
  const { data, isLoading, isError, status } = useQuery(
    ["weatherByLocation", lat, lon],
    () => getCurrentLocationWeather(lat, lon),
    {
      staleTime: 60 * 1000 * 5,
    }
  );

  const invalidateWeatherByLocation = () => {
    client.invalidateQueries("weatherByLocation");
  };

  return {
    weatherData: data,
    isLoading,
    isError,
    status,
    invalidateWeatherByLocation,
  };
};
