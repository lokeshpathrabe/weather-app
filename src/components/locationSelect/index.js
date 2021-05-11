import React, { useEffect, useCallback, useState, useMemo } from "react";
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
  const [options, setOptions] = useState([]);

  const { currentLocation } = useCurrentLocation();
  const {
    autoCompleteOptions,
    isLoading,
    invalidateLocationAutoComplete,
  } = useLocationOptions(input);

  useEffect(() => {
    return () => invalidateLocationAutoComplete();
  }, []);

  const currentLocationOption = useMemo(() => {
    if (currentLocation && currentLocation.place_id) {
      return {
        value: currentLocation.place_id,
        label: currentLocation.address.city || currentLocation.address.town,
        data: currentLocation,
      };
    }
    return {};
  }, [currentLocation]);

  useEffect(() => {
    setOptions([...autoCompleteOptions, currentLocationOption]);
  }, [autoCompleteOptions, currentLocationOption]);

  useEffect(() => {
    if (currentLocationOption) {
      updateSelectedLocation(currentLocationOption);
    }
  }, [currentLocationOption, updateSelectedLocation]);

  const onChange = useCallback(
    (e, value) => {
      updateSelectedLocation(value);
    },
    [updateSelectedLocation]
  );

  const onInputChange = useCallback((e, value) => {
    setInput(value);
  }, []);

  return (
    <FormControl
      style={{ maxWidth: maxWidth, marginBottom: "5vh" }}
      variant="outlined"
      fullWidth
    >
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
        options={options}
        loading={isLoading}
        getOptionSelected={(option, value) => {
          // console.log(option, value);
          return option.value === value.value;
        }}
        getOptionLabel={(option) => {
          return option.label || "";
        }}
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
      {/* <pre>{JSON.stringify(selectedLocation, null, 2)}</pre> */}
    </FormControl>
  );
};

export default LocationSelect;
