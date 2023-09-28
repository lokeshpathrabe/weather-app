import React from "react";
import image from "../../../assets/day/113.png";
import { makeStyles } from "@material-ui/core/styles";
import Widget from "../widget";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import humidity from "../../../assets/humidity.png";
import pressure from "../../../assets/pressure.png";
import wind from "../../../assets/wind.png";

const useStyles = makeStyles({
  widgetRoot: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "space-around",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "210px",
  },
  widgetImg: {},
  conditionLabel: {},
  conditionTagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-around",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  conditionTag: {
    marginBottom: "16px",
  },
});

const WeatherCondition = ({ data, isLoading }) => {
  const classes = useStyles();
  // console.log(data, isLoading);
  return (
    <Widget className={classes.widgetRoot} isLoading={isLoading}>
      {data && data.current ? (
        <>
          <img
            className={classes.widgetImg}
            src={image}
            width={64}
            height={64}
            alt="condition"
          />
          <div className={classes.conditionLabel}>
            {data.current.condition.text}
          </div>
          <div className={classes.conditionTagContainer}>
            <Chip
              className={classes.conditionTag}
              avatar={<Avatar alt="humidity" src={humidity} />}
              label={`Humidity: ${data.current.humidity} %`}
            />{" "}
            <Chip
              className={classes.conditionTag}
              avatar={<Avatar alt="humidity" src={pressure} />}
              label={`Humidity: ${data.current.pressure_in} `}
            />{" "}
            <Chip
              className={classes.conditionTag}
              avatar={<Avatar alt="humidity" src={wind} />}
              label={`Humidity: ${data.current.wind_kph} km/hr`}
            />
          </div>
        </>
      ) : null}
    </Widget>
  );
};

export default WeatherCondition;
