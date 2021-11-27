import type { NextPage } from "next";
import { useEffect, useState } from "react";
import WeatherPage from "../components/WeatherPage";
import InfoPage from "../components/InfoPage";

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
  }, [geolocation]);

  switch (permission) {
    case Permissions.GRANTED:
      return (
        <WeatherPage
          location={"Colomadu"}
          temperature={"22"}
          date={`${today.month}, ${today.date}`}
          year={today.year}
        />
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
