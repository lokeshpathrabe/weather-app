import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    height: "50px",
    background: "#f1eeee",
    width: "100%",
    left: 0,
    right: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <a href="https://www.weatherapi.com/" title="Free Weather API">
        <img
          src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
          alt="Weather data by WeatherAPI.com"
          border="0"
        ></img>
      </a>
    </div>
  );
};

export default Footer;
