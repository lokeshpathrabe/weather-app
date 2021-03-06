import { makeStyles } from "@material-ui/core";
import React from "react";
import clock from "./../../../assets/clock.png";
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

const LocalTime = ({ data, isLoading }) => {
  const classes = useStyles();
  return (
    <Widget className={classes.root} isLoading={isLoading}>
      {data && data.location ? (
        <>
          <div>
            <img src={clock} alt={`${data.location.localtime}`} />
          </div>
          <div>{data.location.localtime}</div>
        </>
      ) : null}
    </Widget>
  );
};

export default LocalTime;
