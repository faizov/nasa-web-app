import React from "react";

import { useFetch } from "usehooks-ts";

import "./styles.scss";

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
  const forrmattedDate = date.toISOString().split("T")[0];

  const { data, error } = useFetch<TPhotosArray>(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${nameRover}/photos?earth_date=${forrmattedDate}&api_key=${
      import.meta.env.VITE_API
    }`
  );

  return (
    <div className="photos">
      {data &&
        data.photos.length > 0 &&
        data.photos.map((item) => {
          return (
            <div key={item.id} className="item">
              <img src={item.img_src} alt="" loading="lazy" />
            </div>
          );
        })}
    </div>
  );
};
