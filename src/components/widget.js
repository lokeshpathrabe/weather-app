import Grid from "@material-ui/core/Grid";
import React from "react";

const Widget = ({ spacing, children, className, ...props }) => {
  return (
    <Grid className={`${className} widget`} item justify="center" {...props}>
      {children}
    </Grid>
  );
};

export default Widget;
