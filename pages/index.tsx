import type { NextPage } from "next";
import { useEffect, useState } from "react";
import WeatherPage from "../components/WeatherPage";
import InfoPage from "../components/InfoPage";

type Data = {
  lat: number | null;
  lon: number | null;
};

const Index: NextPage = () => {
  const [geolocated, setGeolocated] = useState<Boolean>(false);
  const [geolocation, setGeolocation] = useState<Data>({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    //Getting geolocation of client's browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
        setGeolocation({
          lat: data.coords.latitude,
          lon: data.coords.longitude,
        });
        setGeolocated(true);
      });
    }
  }, []);

  if (geolocated)
    return (
      <WeatherPage
        location={"Colomadu"}
        temperature={"22"}
        date={"November, 25th"}
        year={"2021"}
      />
    );
  else return <InfoPage message="Getting client's information" />;
};

export default Index;
