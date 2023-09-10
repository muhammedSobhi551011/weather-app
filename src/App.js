import "./App.css";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";

// EXTERNALS
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/ar";
function App() {
  // myThem //
  const myTheme = createTheme({
    palette: {
      primary: {
        main: "#4F709C",
      },
      secondary: {
        main: "#F0F0F0",
      },
    },
    typography: {
      fontFamily: "Tajawal",
    },
  });
  //=== myThem ===//

  // states //
  const [weather, setWeather] = useState({
    localtime: "",
    maxTemp: null,
    minTemp: null,
    icon: "",
    discription: "",
  });
  const [local, setLocal] = useState("en");
  //=== states ===//

  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(local);
    moment.locale(local);
  }, [local, i18n]);
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=cb4d1eb9f93f4b49acb140048230909&q=auto:ip"
      )
      .then(function (response) {
        const data = response.data;
        setWeather({
          localtime: data.location.localtime,
          maxTemp: data.current.feelslike_c,
          minTemp: data.current.temp_c,
          icon: data.current.condition.icon,
          discription: data.current.condition.text,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const date = {
    day: moment().format("Do"),
    month: moment().format("MMMM"),
    year: moment().format("YY"),
  };

  const handleTranslationClick = () => {
    if (local === "ar") {
      setLocal("en");
    } else if (local === "en") {
      setLocal("ar");
    }
  };
  return (
    <div className='App'>
      <ThemeProvider theme={myTheme}>
        <Container
          dir={local==="en"?"ltr":"rtl"}
          maxWidth='sm'
          sx={{
            height: "100dvh",
            display: "flex",
            alignItems: "center",
          }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}>
            <Card
              variant='outlined'
              sx={{ width: "100%", background: myTheme.palette.primary.main }}>
              <CardHeader
                sx={{ paddingBottom: "0" }}
                title={
                  <Stack direction='column'>
                    <Stack
                      direction='row'
                      alignItems='end'
                      columnGap={4}
                      sx={{ color: myTheme.palette.secondary.main }}>
                      {/* Todo: city&date from api */}
                      <Typography variant='h3' fontWeight={600}>
                        {t("Cairo")}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                        }}>{`${date.month}\t${date.day}\t${date.year}`}</Typography>
                      {/*=== Todo: city&date from api ===*/}
                    </Stack>
                    <hr style={{ width: "100%" }} />
                  </Stack>
                }
              />
              <CardContent sx={{ paddingTop: "0" }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  sx={{ color: myTheme.palette.secondary.main }}>
                  <Stack direction='column' justifyContent='space-around'>
                    {/* from api */}
                    <Stack direction='row' columnGap={2} alignItems='center'>
                      {/* temp */}
                      <Typography variant='h1'>{weather.maxTemp}</Typography>
                      {/*=== temp ===*/}
                      {/* weather icon */}
                      <img src={weather.icon} alt='' />
                      {/*=== weather icon ===*/}
                    </Stack>
                    {/* weather info */}
                    <Typography variant='button' textAlign='start'>
                      {t(weather.discription)}
                    </Typography>
                    <Stack direction='row' columnGap={2}>
                      <Typography variant='button'>
                        {t("min") + ":"} {weather.minTemp}
                      </Typography>
                      <Typography variant='button'>|</Typography>
                      <Typography variant='button'>
                        {t("max") + ":"} {weather.maxTemp}
                      </Typography>
                    </Stack>
                    {/*=== weather info ===*/}
                    {/*=== from api ===*/}
                  </Stack>
                  <CloudIcon
                    sx={{
                      margin: "0 0 0 10px",
                      fontSize: "200px",
                      color: myTheme.palette.primary.contrastText,
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
            <div style={{ display: "flex", justifyContent: "end" }}>
              {/* translation button */}
              <Button
                variant='text'
                color='secondary'
                onClick={handleTranslationClick}>
                {local === "ar" ? "انجليزي" : "ARABIC"}
              </Button>
              {/*=== translation button ===*/}
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
