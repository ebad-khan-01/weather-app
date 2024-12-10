import React from "react";

function WeatherElement({ icon, value, label }) {
  return (
    <div className="element">
      <img src={icon} className="icon" alt={label} />
      <div className="data">
        <div className="value">{value}</div>
        <div className="text">{label}</div>
      </div>
    </div>
  );
}

export default WeatherElement;
