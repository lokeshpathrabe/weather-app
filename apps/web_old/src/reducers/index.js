import { useReducer, useCallback } from "react";

const selectedLocationReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return action.payload;
    default:
      return {};
  }
};

export const useSelectedLocation = () => {
  const [selectedLocation, dispatch] = useReducer(selectedLocationReducer, {});
  const updateSelectedLocation = useCallback(
    (payload) => dispatch({ type: "update", payload }),
    []
  );
  return {
    selectedLocation,
    updateSelectedLocation,
  };
};
