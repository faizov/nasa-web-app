import React from "react";
import { Link } from "react-router-dom";
import { useFetch, useReadLocalStorage } from "usehooks-ts";

import ImageNotFoundDark from "../../assets/images/404-rover-dark.svg";
import ImageNotFoundLight from "../../assets/images/404-rover-light.svg";

import style from "./styles.module.scss";

type Props = {
  date: Date;
  nameRover: string;
};

type TPhotosArray = {
  photos: TPhoto[];
};

type TPhoto = {
  id: number;
  earth_date: string;
  img_src: string;
  sol: number;
};

export const ListPhotos = ({ date, nameRover }: Props) => {
  const darkMode = useReadLocalStorage("darkMode");
  const forrmattedDate = date.toISOString().split("T")[0];

  const { data, error } = useFetch<TPhotosArray>(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${nameRover}/photos?earth_date=${forrmattedDate}&api_key=${
      import.meta.env.VITE_API
    }`
  );

  if (data && data.photos.length === 0) {
    return (
      <div className={style.notFound}>
        <h1>Sorry, no photos match</h1>
        <p>Please try a different date or rover</p>
        <img src={darkMode ? ImageNotFoundDark : ImageNotFoundLight} alt="" />
      </div>
    );
  }

  return (
    <div className={style.photos}>
      {data &&
        data.photos.length > 0 &&
        data.photos.map((item) => {
          return (
            <div key={item.id} className={style.item}>
              <Link to={item.img_src} target="_blank">
                <img src={item.img_src} alt="" loading="lazy" />
              </Link>
            </div>
          );
        })}
    </div>
  );
};
