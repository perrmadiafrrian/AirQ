import React from "react";
import "./App.css";

const Info = ({ message }) => {
  return (
    <div className="App">
      <div className="Center-Container">
        <span className="Info">{message}</span>
      </div>
    </div>
  );
};

export default Info;
