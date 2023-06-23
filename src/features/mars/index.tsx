import React, { ChangeEvent, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { SelectDate } from "../../components/selectdate";
import { useFetch } from "usehooks-ts";
import { ListPhotos } from "./photos";

import { roversList } from "./const";

import style from "./styles.module.scss";

type RoverInfo = {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
  };
};

export const MarsPage = () => {
  const [selectRover, setSelectRover] = useState(roversList[0]);
  const [alert, setOpenAlert] = useState(false);

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
    <div className={style.mars}>
      <Scrollbars style={{ height: "80vh" }}>
        <div className={style.selectRover}>
          <div className={style.avatar} onClick={() => setOpenAlert(!alert)}>
            <img src={selectRover.img} alt="rover" />
            <span className={style.countMessage}>1</span>
          </div>

          {!alert ? (
            <select onChange={(e) => onSelectRover(e)}>
              {roversList.map((i) => {
                return (
                  <option key={i.name} value={i.name}>
                    {i.name}
                  </option>
                );
              })}
            </select>
          ) : (
            <div className={style.alert}>{selectRover.message}</div>
          )}

          {!alert && data && (
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
