import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Widget from "../../widget";

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

export default function TemperatureScale() {
  return (
    <Widget className="temperature-widget">
      <Typography id="temperature-scale" gutterBottom>
        Temperature
      </Typography>

      <Slider
        orientation="vertical"
        defaultValue={30}
        aria-labelledby="temperature-scale"
        getAriaValueText={valuetext}
        marks={marks}
      />
    </Widget>
  );
}
