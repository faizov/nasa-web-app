import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import ImageCuriosity from "../../assets/images/rovers/curiosity.png";

import { SelectDate } from "../../components/selectdate";
import { useFetch } from "usehooks-ts";
import { ListPhotos } from "./photos";

import { roversList } from "./const";

import "./styles.scss";
import Scrollbars from "react-custom-scrollbars-2";

type photos = {
  cameras: string[];
  earth_date: string;
  sol: number;
  total_photos: number;
};

type RoverInfo = {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: photos[];
  };
};

export const MarsPage = () => {
  const [selectRover, setSelectRover] = useState(roversList[0]);

  const { data, error } = useFetch<RoverInfo>(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/${
      selectRover.name
    }/?api_key=${import.meta.env.VITE_API}`
  );

  const [date, setDate] = useState<Date | null>(null);

  const onSelectRover = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const selectRover = roversList.find((x) => x.name === value);

    if (selectRover) {
      setSelectRover(selectRover);
    }
  };

  return (
    <div className="mars">
      <Scrollbars style={{ height: "80vh" }}>
        <div className="select-rover">
          <div className="avatar">
            <img src={selectRover.img} alt="rover" />
            <span className="count-message">1</span>
          </div>

          <select onChange={(e) => onSelectRover(e)}>
            {roversList.map((i) => {
              return (
                <option key={i.name} value={i.name}>
                  {i.name}
                </option>
              );
            })}
          </select>

          {data && (
            <SelectDate
              date={date || new Date(data.photo_manifest.max_date)}
              minDate={data.photo_manifest.landing_date}
              maxDate={data.photo_manifest.max_date}
              onChange={setDate}
            />
          )}
        </div>

        {data && (
          <ListPhotos
            nameRover={selectRover.name}
            date={date || new Date(data.photo_manifest.max_date)}
          />
        )}
      </Scrollbars>
    </div>
  );
};
