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
    `https://api.weatherapi.com/v1/search.json?key=${key}&q=${query}`
  );
  const data = await result.json();
  // const cities = filterCities(data);
  const response = {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'GET,OPTIONS',
      'Access-Control-Request-Headers': 'Content-Type'
    },
    body: JSON.stringify(data),
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
