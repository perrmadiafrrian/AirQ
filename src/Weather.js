import React, { useState, useEffect } from "react";
import logo from "./miyg.png";
import "./App.css";
import Axios from "axios";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const months = [
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

const getOrdinal = (n) => {
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

const KEY = process.env.REACT_APP_KEY;

const Weather = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState({});

  useEffect(() => {
    const fetchData = async (latitude, longitude, setWeather) => {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`
      )
        .then((res) => {
          setWeather(res.data);
          return res.data;
        })
        .catch((e) => {
          console.error(e);
          return e;
        });
    };
    fetchData(latitude, longitude, setWeather);
    const d = new Date();
    setDate({
      date: d.getDate() + getOrdinal(d.getDate()),
      year: d.getFullYear(),
      month: months[d.getMonth()],
    });
  }, [latitude, longitude]);

  return weather.name ? (
    <div className="Weather">
      <div className="Top-Container">
        <img className="Logo" src={logo} alt="AirQ" />
        <span className="SideText">{weather.name}</span>
      </div>
      <div className="Center-Container">
        <span className="Temperature">
          {parseInt(weather.main.temp - 273.15)}
          <span className="Unit">°C</span>
        </span>
      </div>
      <div className="Bottom-Container">
        <span className="SideText">
          {date.month}, {date.date}
        </span>
        <span className="SideText">{date.year}</span>
      </div>
    </div>
  ) : (
    <div className="App">
      <div className="Center-Container">
        <SyncLoader css={override} size={30} color={"#f2faff"} loading={true} />
      </div>
    </div>
  );
};

export default Weather;
