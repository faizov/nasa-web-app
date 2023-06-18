import React from "react";
import { NavLink } from "react-router-dom";

import LogoDarkImg from "../../assets/images/logo-dark.png";
import LogoLightImg from "../../assets/images/logo-light.png";
import IconSun from "../../assets/icons/icon-sun.svg";
import IconMoon from "../../assets/icons/icon-moon.svg";

import "./styles.scss";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const NavMenu = ({ darkMode, toggleDarkMode }: Props) => {
  return (
    <div className="header">
      <div className="logo">
        <img src={darkMode ? LogoDarkImg : LogoLightImg} alt="" />
      </div>

      <ul className="list-menu">
        <li>
          <NavLink to="/">Apod</NavLink>
        </li>
        <li>
          <NavLink to="likes">Likes</NavLink>
        </li>
        <li>
          <NavLink to="/mars">Mars</NavLink>
        </li>
      </ul>

      <label className="switch">
        <input type="checkbox" onChange={() => toggleDarkMode()} />
        <span className="slider round">
          <img src={IconSun} alt="" />
          <img src={IconMoon} alt="" />
        </span>
      </label>
    </div>
  );
};
