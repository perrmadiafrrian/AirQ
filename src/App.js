import React from "react";
import "./App.css";
import { geolocated } from "react-geolocated";
import Weather from "./Weather";
import Info from "./Info";

const App = (props) => {
  return !props.isGeolocationAvailable ? (
    <Info message="Your browser doesn't support Geolocation. Sorry." />
  ) : !props.isGeolocationEnabled ? (
    <Info message="Geolocation is not enabled." />
  ) : props.coords ? (
    <Weather
      latitude={props.coords.latitude}
      longitude={props.coords.longitude}
    />
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
