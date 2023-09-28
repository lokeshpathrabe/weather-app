import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import React from "react";

const Widget = ({ spacing, children, className, isLoading, ...props }) => {
  // console.log("isloading: ", isLoading);
  return (
    <Grid
      className={`${className} widget`}
      item
      justify="center"
      spacing={2}
      {...props}
    >
      {isLoading ? <WidgetLoader /> : children}
    </Grid>
  );
};

const WidgetLoader = () => (
  <>
    <Skeleton variant="circle" width={300} height={250} />
    <Skeleton variant="text" height={50} width={300} />
  </>
);

export default Widget;
