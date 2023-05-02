import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Apod } from "./features/apod/apod";

import LogoDarkImg from "./assets/images/logo-dark.png";
import LogoLightImg from "./assets/images/logo-light.png";
import IconSun from "./assets/icons/icon-sun.svg";
import IconMoon from "./assets/icons/icon-moon.svg";

import "./styles.scss";

function App(): JSX.Element {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode") ?? "false");

  const [darkMode, setDarkMode] = useState(
    savedDarkMode ?? window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="App">
        <div className="header">
          <div className="logo">
            <img src={darkMode ? LogoDarkImg : LogoLightImg} alt="" />
          </div>
          <label className="switch">
            <input type="checkbox" onChange={() => toggleDarkMode()}/>
            <span className="slider round">
              <img src={IconSun} alt="" />
              <img src={IconMoon} alt="" />
            </span>
          </label>
        </div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Apod />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav> */}

      <Outlet />
    </div>
  );
}

export default App;
