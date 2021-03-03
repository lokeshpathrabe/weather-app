import Grid from "@material-ui/core/Grid";
import React from "react";
import { useWeatherByLocation } from "../queries/weather.queries";

const WeatherWidgets = ({
  spacing,
  children,
  className,
  lat,
  lon,
  ...props
}) => {
  const { weatherData, isLoading } = useWeatherByLocation(lat, lon);
  return (
    <Grid
      className={`${className} widget-container`}
      container
      justify="center"
      spacing={spacing}
      {...props}
    >
      <pre>
        {isLoading ? "loading.... " : JSON.stringify(weatherData, null, 2)}
      </pre>
    </Grid>
  );
};

export default WeatherWidgets;
