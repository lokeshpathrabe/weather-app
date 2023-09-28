import { makeStyles } from "@material-ui/core";
import React from "react";
import thermometer from "../../../assets/thermometer.png";
import Widget from "../widget";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "space-around",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "210px",
  },
});

const TemperatureMeter = ({ data, isLoading }) => {
  const classes = useStyles();
  return (
    <Widget className={classes.root} isLoading={isLoading}>
      {data && data.current ? (
        <>
          <div>
            <img src={thermometer} alt={`${data.current.temp_c}`} />
          </div>
          <div>
            <span>{data.current.temp_c} C</span>
            <span>{data.current.temp_f} F</span>
          </div>
        </>
      ) : null}
    </Widget>
  );
};

export default TemperatureMeter;
