import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { ApodPage } from "./features/apod";
import LikesPage from "./features/likes";

import "./styles.scss";
import { NavMenu } from "./components/navmenu";

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
        <NavMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ApodPage />} />
            <Route path="likes" index element={<LikesPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="outlet">
      <Outlet />
    </div>
  );
}

export default App;
