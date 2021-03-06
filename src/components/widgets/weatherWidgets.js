import Grid from "@material-ui/core/Grid";
import React from "react";
import { useWeatherByLocation } from "../../queries/weather.queries";
import LocalTime from "./localTime";
import TemperatureScale from "./temperatureScale";
import WeatherCondition from "./weatherCondition";
import TemperatureMeter from "./temperatureMeter";

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
      <WeatherCondition data={weatherData} isLoading={isLoading} />
      <LocalTime data={weatherData} isLoading={isLoading} />
      <TemperatureMeter data={weatherData} isLoading={isLoading} />
    </Grid>
  );
};

export default WeatherWidgets;
