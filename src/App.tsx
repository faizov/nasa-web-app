import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Apod } from "./features/apod/apod";

import LogoImg from "./assets/images/logoSvg.svg";

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
        <div className="logo">
          <img src={LogoImg} alt="" />
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
