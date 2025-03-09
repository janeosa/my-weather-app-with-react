import React from "react";
import "./App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        This project was coded by{" "}
        <a
          href="https://github.com/janeosa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jane Ighodaro
        </a>
        , is open-sourced on{" "}
        <a
          href="https://github.com/janeosa/my-weather-app-with-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        and hosted on{" "}
        <a
          href="https://my-weather-app-by-jane-osa.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
        .
      </p>
    </footer>
  );
}
