import "./App.scss";
import LocationSelect from "./components/locationSelect";
import TemperatureScale from "./components/widgets/temperatureScale";
import Container from "@material-ui/core/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import WeatherWidgets from "./components/weatherWidgets";
import { useSelectedLocation } from "./reducers";

function App() {
  const queryClient = new QueryClient();
  const { selectedLocation, updateSelectedLocation } = useSelectedLocation();
  const { lat, lon } = selectedLocation?.data || {};
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Container className="app-container" maxWidth={false}>
        <LocationSelect
          maxWidth="50%"
          selectedLocation={selectedLocation}
          updateSelectedLocation={updateSelectedLocation}
        />
        <WeatherWidgets lat={lat} lon={lon} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
