// import fetch from "fetch";

export const getCurrentLocationWeather = (location) => {
  return fetch(
    `http://api.weatherapi.com/v1/current.json?key=c61f699e63cb43fa8a8112027202612&q=${location}`,
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
};
