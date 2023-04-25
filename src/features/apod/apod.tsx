import React, { useState } from "react";
import { useGetApodQuery } from "./apodApi";
import LogoImg from "../../logo.png";
import InfoImg from "../../info.png";

import "./styles.scss";

export const Apod = () => {
  const { data, error, isLoading } = useGetApodQuery("");
  const [hidden, setHidden] = useState(true);

  if (error && !data) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>isLoading</div>;
  }
  const apod = data[0];
  console.log("apod", apod);
  return (
    <div
      className="root"
      style={{ backgroundImage: apod.hdurl && `url(${apod.hdurl})` }}
    >
      <div className="container">
        <div className="logo">
          <img src={LogoImg} alt="logo" />
        </div>
        {!hidden && apod && (
          <div className="info">
            <h1>{apod.title}</h1>
            <p>{apod.explanation}</p>
          </div>
        )}
      </div>
      <div className="info-icon">
        <img src={InfoImg} alt="" onClick={() => setHidden(!hidden)} />
      </div>
      {apod.media_type === "video" && (
        <iframe
          src={apod.url}
          style={{
            overflow: "hidden",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
          }}
          height="100%"
          width="100%"
        ></iframe>
      )}
    </div>
  );
};
