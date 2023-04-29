import React from "react";
import { useGetApodQuery } from "./apodApi";

import LogoImg from "../../logo.png";

import "./styles.scss";

export const Apod = () => {
  const { data, error, isLoading } = useGetApodQuery("");

  if (error && !data) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <></>;
  }

  const apod = data[0];

  return (
    <div className="root">
      <div className="info">
        <div className="logo">
          <img src={LogoImg} alt="" />
          <div>
            {" "}
            <h3>Web NASA</h3>
            <p>Astronomy Picture of the Day</p>
          </div>
        </div>
        <span className="date">{apod.date}</span>
        <h1>{apod.title}</h1>
        <p>{apod.explanation}</p>
      </div>
      <div className="media">
        {/* <div className="full">
          <a
            href={apod.hdurl || apod.url}
            target="_blank"
            rel="noopener noreferrer"
          > 

            <img src={LinkExtIcon} alt="" />
          </a>
        </div> */}
        <a
          href={apod.hdurl || apod.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={apod.hdurl} alt="" />
        </a>
        {apod.copyright && (
          <div className="credit">Сopyright: {apod.copyright}</div>
        )}
      </div>
    </div>
  );
};
