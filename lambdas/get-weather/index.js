const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    const lat = event.queryStringParameters && event.queryStringParameters.lat;
    const lon = event.queryStringParameters && event.queryStringParameters.lon;
    return await getWeatherByLocation(lat, lon);
  } else {
    return httpMethodError();
  }
};

const getWeatherByLocation = async (lat, lon) => {
  const key = process.env.WEATHER_API_KEY;
  console.log(`GET weather for location ${lat}, ${lon}`);
  if (lat && lon) {
    const result = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`,
      {
        method: "GET",
      }
    );
    const data = await result.json();
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
  } else {
    return {
      statusCode: 500,
      body: "Latitude nad Longitude details are required in params",
    };
  }
};

const httpMethodError = () => {
  const response = {
    statusCode: 405,
    body: "Only GET request is supported",
  };
  return response;
};
