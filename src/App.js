import "./App.scss";
import LocationSelect from "./components/locationSelect";
import Container from "@material-ui/core/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import WeatherWidgets from "./components/widgets/weatherWidgets";
import { useSelectedLocation } from "./reducers";
import Footer from "./components/footer";
import { makeStyles } from "@material-ui/core";

const queryClient = new QueryClient();
const useStyles = makeStyles({
  appContainer: {
    display: "flex",
    justifyContent: " space-around",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    height: "100vh",
  },
});

function App() {
  const { selectedLocation, updateSelectedLocation } = useSelectedLocation();
  const { lat, lon } = selectedLocation?.data || {};
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <Container className={classes.appContainer} maxWidth={false}>
        <LocationSelect
          maxWidth="30%"
          selectedLocation={selectedLocation}
          updateSelectedLocation={updateSelectedLocation}
        />
        <WeatherWidgets lat={lat} lon={lon} />
        <Footer />
      </Container>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
