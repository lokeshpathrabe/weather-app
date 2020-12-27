import "./App.css";
import { useEffect, useState } from "react";
import { getCurrentLocationWeather } from "./api/current.api.js";
import { getCurrentLocation } from "./api/location.api.js";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    getCurrentLocation().then((location) => {
      const city = location.address.city || location.address.town;
      getCurrentLocationWeather(city).then((json) => {
        setData(json);
      });
    });
  }, []);
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
