import React, { useState } from "react";
import "./App.css";

export default function Header({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSearch(city) {
    onSearch(city);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim()) {
      handleSearch(city);
    }
  }

  return (
    <div className="Header">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          required
          className="search-form-input"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input type="submit" value="Search" className="search-form-button" />
      </form>
    </div>
  );
}
