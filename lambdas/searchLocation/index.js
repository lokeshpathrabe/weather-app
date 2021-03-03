const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    const lat = event.queryStringParameters && event.queryStringParameters.lat;
    const lon = event.queryStringParameters && event.queryStringParameters.lon;
    const query =
      event.queryStringParameters && event.queryStringParameters.query;

    return await getLocations(lat, lon);
  } else {
    return httpMethodError();
  }
};

const getLocations = async (lat, lon) => {
  const key = process.env.LOCATION_API_KEY;
  console.log(`GET location for ${lat} ${lon}`);
  const result = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`
  );
  const data = await result.json();
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  return response;
};

const httpMethodError = () => {
  const response = {
    statusCode: 405,
    body: "Only GET request is supported",
  };
  return response;
};
