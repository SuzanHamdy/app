

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid2,

  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";
import { Search } from "@mui/icons-material";
import AirIcon from "@mui/icons-material/Air";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import a from "../assets/01d@2x.png";
import c from "../assets/02d@2x.png";
import d from "../assets/03d@2x.png";
import e from "../assets/04d@2x.png";
import f from "../assets/09d@2x.png";
import g from "../assets/10d@2x.png";
import h from "../assets/11d@2x.png";
import i from "../assets/50d@2x.png";

const CityName = styled(Box)({
  width: { xs: "100%", sm: "70%" },
  minHeight: "80vh",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  margin: "100px auto",
  borderRadius: "5%",
  padding: "30px",
  boxShadow: "10px 10px 40px black",
});

const Filled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 10px",
});

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allIcon = {
    "01d": a,
    "01n": a,
    "02d": c,
    "02n": c,
    "03d": d,
    "03n": d,
    "04d": e,
    "04n": e,
    "09d": f,
    "09n": f,
    "10d": g,
    "10n": g,
    "11d": h,
    "11n": h,
    "50d": i,
    "50n": i,
  };

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const search = async (City) => {
    if (City === "") {
      setError("City name cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const Url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=df1924f1e534a7d97ca9df1943a1f317`;
      const response = await fetch(Url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setWeatherData(null);
        return;
      }

      const icon = allIcon[data.weather[0].icon] || a;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country: data.sys.country,
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        desc: data.weather[0].description,
        icon: icon,
      });
    } catch (error) {
      setError("Error fetching the weather data");
      console.error("Enter your city", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleChange = (e) => {
    setCity(e.target.value);
  };

  const clickBtn = () => {
    search(city);
  };

  return (
    <Container sx={{ width: { xs: "100%" } }}>
      <CityName>
        <Filled>
          <TextField
            onChange={HandleChange}
            fullWidth
            sx={{ m: { xs: 0, sm: 1 } }}
            variant="filled"
            label="City"
          />
          <Stack direction="row" spacing={1}>
            <Button
              onClick={clickBtn}
              variant="text"
              endIcon={<Search />}
            >
              Search
            </Button>
          </Stack>
        </Filled>
        <Divider />
        <Box>
          {loading ? (
            <Typography
              variant="body1"
              color="primary"
              style={{ textAlign: "center", margin: "4px auto" }}
            >
              Loading...
            </Typography>
          ) : (
            <>
              {error ? (
                <Typography
                  variant="body1"
                  color="error"
                  style={{ textAlign: "center", margin: "4px auto" }}
                >
                  {error}
                </Typography>
              ) : weatherData ? (
                <Box sx={{ width: "100%" }}>
                  <Grid2 container spacing={1}>
                    <Box margin="4px auto">
                      <Typography variant="h4" color="primary">
                        {weatherData.temperature} °C
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {weatherData.location} / {weatherData.country}
                      </Typography>
                    </Box>
                    <Avatar
                      src={weatherData.icon}
                      sx={{
                        width: 200,
                        height: 100,
                        border: 1,
                        borderColor: "primary.main",
                        margin: "4px auto",
                      }}
                    />
                  </Grid2>
                  <Divider />
                  <Box sx={{ width: "100%", marginLeft: {md:"60px"} }}>
                    <Grid2 container spacing={1}>
                      <Typography
                      variant="body1"
                        color="primary"
                        sx={{ p:"7px", margin:{sm:"20px 5%"}}}
                      >
                        <LegendToggleIcon /> <br />
                        {weatherData.humidity}
                        <br />
                        Humidity
                      </Typography>
                      <Typography
                     variant="body1"
                        color="primary" 
                     sx={{ p:"7px", margin:{sm:"20px 5%"}}}
                      >
                        <AirIcon /> <br /> {weatherData.windSpeed}
                        <br />
                        Wind Speed
                      </Typography>
                      <Typography
                          variant="body1"
                        color="primary"
                        sx={{p:"7px",  margin:{sm:"20px 5%"}}}
                      >
                        <Brightness5Icon /> <br />
                        {weatherData.sunrise} <br />
                        Sunrise
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ p:"7px", margin:{sm:"20px 5%"}}}
                      >
                        <Brightness6Icon /> <br />
                        {weatherData.sunset} <br />
                        Sunset
                      </Typography>
                    </Grid2>
                  </Box>
                </Box>
              ) : (
                <Typography
                  variant="h3"
                  color="primary"
                  style={{ textAlign: "center", margin: "4px auto" }}
                >
                  Enter City Name
                </Typography>
              )}
            </>
          )}
        </Box>
      </CityName>
    </Container>
  );
};

export default Home;