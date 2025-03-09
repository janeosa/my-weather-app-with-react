import "./App.css";
import React from "react";
import CurrentWeather from "./CurrentWeather";
import Footer from "./Footer";
import ChangeTheme from "./ChangeTheme";

export default function App() {
  return (
    <div>
      <ChangeTheme />
      <div className="App">
        <CurrentWeather />
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}
