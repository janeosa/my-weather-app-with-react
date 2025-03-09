import React, { useState } from "react";
import "./App.js";
import "./App.css";
export default function ChangeTheme() {
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight((prev) => !prev);
    document.body.classList.toggle("light");
  };
  return (
    <button className="theme-button" onClick={toggleTheme}>
      {isLight ? "Change Theme" : "Change Theme"}
    </button>
  );
}
