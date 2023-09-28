import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Widget from "../widget";

function valuetext(value) {
  return `${value}°C`;
}

export default function TemperatureScale({ isLoading, value }) {
  const integerValue = Number.parseInt(value);
  return (
    <Widget className="temperature-widget" isLoading={isLoading}>
      <Typography id="temperature-scale" gutterBottom>
        Temperature
      </Typography>

      <Slider
        orientation="vertical"
        defaultValue={integerValue}
        aria-labelledby="temperature-scale"
        getAriaValueText={valuetext}
        max={60}
        min={-60}
        marks={[
          {
            value: integerValue,
            label: `${integerValue}°C`,
          },
        ]}
        step={null}
      />
    </Widget>
  );
}
