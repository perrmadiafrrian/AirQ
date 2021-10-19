import React from "react";
import "./App.css";
import { geolocated } from "react-geolocated";
import Weather from "./Weather";
import Info from "./Info";

const App = ({ isGeolocationAvailable, isGeolocationEnabled, coords }) => {
  return !isGeolocationAvailable ? (
    <Info message="Your browser doesn't support Geolocation. Sorry." />
  ) : !isGeolocationEnabled ? (
    <Info message="Geolocation is not enabled." />
  ) : coords ? (
    <Weather latitude={coords.latitude} longitude={coords.longitude} />
  ) : (
    <Info message="Getting Location" />
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
