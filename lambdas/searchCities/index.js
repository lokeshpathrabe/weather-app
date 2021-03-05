const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    const query =
      event.queryStringParameters && event.queryStringParameters.query;
    return await searchCities(query);
  } else {
    return httpMethodError();
  }
};

const searchCities = async (query) => {
  const key = process.env.LOCATION_API_KEY;
  console.log(`GET search location for ${query}`);
  const result = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${key}&q=${query}&format=json&tag=place:city&dedupe=1`
  );
  const data = await result.json();
  const cities = filterCities(data);
  const response = {
    statusCode: 200,
    body: JSON.stringify(cities),
  };
  return response;
};

const filterCities = (locations = []) =>
  locations.filter((location) => location.type === "city");

const httpMethodError = () => {
  const response = {
    statusCode: 405,
    body: "Only GET request is supported",
  };
  return response;
};
