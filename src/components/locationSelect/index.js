import React, { useEffect, useCallback, useState } from "react";
import { CircularProgress, FormControl, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
  useCurrentLocation,
  useLocationOptions,
} from "../../queries/location.queries";
import debounce from "lodash/debounce";

const LocationSelect = ({
  maxWidth,
  updateSelectedLocation,
  selectedLocation,
}) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const { currentLocation } = useCurrentLocation();
  const {
    options,
    isLoading,
    invalidateLocationAutoComplete,
  } = useLocationOptions(input);

  useEffect(() => {
    return () => invalidateLocationAutoComplete();
  }, [invalidateLocationAutoComplete]);

  useEffect(() => {
    if (currentLocation && currentLocation.place_id) {
      updateSelectedLocation({
        value: currentLocation.place_id,
        label: currentLocation.address.city || currentLocation.address.town,
        data: currentLocation,
      });
    }
  }, [currentLocation, updateSelectedLocation]);

  const onChange = useCallback((e, value) => {
    updateSelectedLocation(value);
  }, []);

  const onInputChange = useCallback((e, value) => {
    console.log("oninputchange", value);
    setInput(value);
  }, []);

  return (
    <FormControl style={{ maxWidth }} variant="outlined" fullWidth>
      <Autocomplete
        id="location"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selectedLocation}
        onChange={onChange}
        onInputChange={debounce(onInputChange, 1000)}
        options={options || []}
        loading={isLoading}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <pre>{JSON.stringify(selectedLocation, null, 2)}</pre>
    </FormControl>
  );
};

export default LocationSelect;
