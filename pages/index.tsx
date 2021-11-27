import type { NextPage } from "next";
import { useEffect, useState } from "react";
import WeatherPage from "../components/WeatherPage";
import InfoPage from "../components/InfoPage";

type Data = {
  lat: number | null;
  lon: number | null;
};

enum Permissions {
  GRANTED = "granted",
  DENIED = "denied",
  PROMPT = "prompt",
}

const Index: NextPage = () => {
  const [permission, setPermission] = useState<Permissions>(Permissions.PROMPT);
  const [geolocation, setGeolocation] = useState<Data>({
    lat: null,
    lon: null,
  });

  const checkResult = (permission_state: string) => {
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
    //Getting permissions
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        checkResult(result.state);

        result.onchange = (ev) => {
          const res = ev.currentTarget as PermissionStatus;
          checkResult(res.state);
        };
      });

    //Getting geolocation of client's browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
        setGeolocation({
          lat: data.coords.latitude,
          lon: data.coords.longitude,
        });
      });
    }
  }, []);

  switch (permission) {
    case Permissions.GRANTED:
      return (
        <WeatherPage
          location={"Colomadu"}
          temperature={"22"}
          date={"November, 25th"}
          year={"2021"}
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
