import { useQuery, useQueryClient } from "react-query";
const AWS_HOST = process.env.REACT_APP_AWS_HOST;

const getCurrentLocationWeather = (lat, lon) => {
  if (lat && lon) {
    return fetch(`${AWS_HOST}/getweather?lat=${lat}&lon=${lon}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  } else {
    return [];
  }
};

export const useWeatherByLocation = (lat, lon) => {
  const client = useQueryClient();
  // console.log("fetching weather for ", lat, lon);
  const { data, isLoading, isError, status } = useQuery(
    ["weatherByLocation", lat, lon],
    () => getCurrentLocationWeather(lat, lon),
    {
      staleTime: 60000,
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
