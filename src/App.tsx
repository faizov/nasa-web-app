import React, { useEffect, useState } from "react";
import Counter from "./features/counter/Counter";
import { ApodFull } from "./features/apod/apodFull";
import { Apod } from "./features/apod/apod";
import "./styles.scss";
import ThemeIcon from "./theme.png";

function App(): JSX.Element {
  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode") ?? "false");

  // начальное значение состояния будет равно сохраненной теме из локального хранилища или
  // настройкам устройства по умолчанию, если сохраненная тема не определена
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
    <div className="App">
      {/* <Counter /> */}
      {/* <ApodFull /> */}

      <div className={darkMode ? "dark-mode" : ""}>
        <button className="btnThemeMode" onClick={toggleDarkMode}>
          <img src={ThemeIcon} alt="" width={30}/>
        </button>
        <Apod />
      </div>
    </div>
  );
}

export default App;
