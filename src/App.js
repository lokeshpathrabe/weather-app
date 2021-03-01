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

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Container className="app-container" maxWidth={false}>
        <LocationSelect
          maxWidth="50%"
          selectedLocation={selectedLocation}
          updateSelectedLocation={updateSelectedLocation}
        />
        <WeatherWidgets selectedLocation={selectedLocation} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
