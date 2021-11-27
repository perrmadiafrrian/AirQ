import type { NextPage } from "next";
import { useEffect, useState } from "react";
import WeatherPage from "../components/WeatherPage";
import InfoPage from "../components/InfoPage";
import axios from "axios";

type Data = {
  lat: number | null;
  lon: number | null;
};

type Today = {
  date: string | null;
  year: number | null;
  month: string | null;
};

enum Permissions {
  GRANTED = "granted",
  DENIED = "denied",
  PROMPT = "prompt",
}

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ResData = {
  coord: Data;
  weather: WeatherData[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sealevel: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type WeatherData = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

const Index: NextPage = () => {
  const [permission, setPermission] = useState<Permissions>(Permissions.PROMPT);
  const [geolocation, setGeolocation] = useState<Data>({
    lat: null,
    lon: null,
  });
  const [today, setToday] = useState<Today>({
    date: null,
    year: null,
    month: null,
  });
  const [location, setLocation] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  // Get number ordinal
  const getOrdinal = (n: number): string => {
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Check permission result
  const checkResult = (permission_state: string): void => {
    switch (permission_state) {
      case Permissions.PROMPT:
        setPermission(Permissions.PROMPT);
        break;
      case Permissions.GRANTED:
        setPermission(Permissions.GRANTED);
        break;
      case Permissions.DENIED:
      default:
        setPermission(Permissions.DENIED);
        break;
    }
  };

  useEffect(() => {
    // Getting permissions
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        checkResult(result.state);

        result.onchange = (ev) => {
          const res = ev.currentTarget as PermissionStatus;
          checkResult(res.state);
        };
      });

    // Getting geolocation of client's browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
        setGeolocation({
          lat: data.coords.latitude,
          lon: data.coords.longitude,
        });
      });
    }

    // Set date
    const d = new Date();
    setToday({
      date: d.getDate() + getOrdinal(d.getDate()),
      year: d.getFullYear(),
      month: months[d.getMonth()],
    });
  }, []);

  useEffect(() => {
    //Getting weather information
    if (geolocation.lat !== null && geolocation.lon !== null) {
      setMessage("Loading temperature data....");
      axios
        .get(`/api/weather?lat=${geolocation.lat}&lon=${geolocation.lon}`)
        .then(({ data }) => {
          const res_data: ResData = data.data;
          setLocation(res_data.name);
          setTemperature(res_data.main.temp - 273.15);
          setMessage(null);
        })
        .catch((err) => {
          setMessage(`${err.name} ${err.message}`);
        });
    }
  }, [geolocation]);

  switch (permission) {
    case Permissions.GRANTED:
      return message === null ? (
        <WeatherPage
          location={location}
          temperature={temperature.toFixed(0)}
          date={`${today.month}, ${today.date}`}
          year={today.year}
        />
      ) : (
        <InfoPage message={message} />
      );
    case Permissions.PROMPT:
      return <InfoPage message="Getting client's information" />;
    case Permissions.DENIED:
    default:
      return (
        <InfoPage message="Client's location permission denied. Please allow location permission on your device" />
      );
  }
};

export default Index;
