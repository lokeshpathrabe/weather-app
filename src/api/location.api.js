export const getCurrentLocation = () => {
  return fetch(
    "https://us1.locationiq.com/v1/reverse.php?key=pk.8782827ee41fddbc68cc44c10dfe33b0&lat=21.0961049&lon=79.11165299999999&format=json"
  ).then((response) => response.json());
};
