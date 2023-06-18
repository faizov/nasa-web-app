import React, { useEffect, useLayoutEffect, useState } from "react";
import { Apod } from "./apod";
import { useSearchParams } from "react-router-dom";

import fetch from "../../utils/fetch";
import { fetchApod, fetchApodDate, fetchApodRandom } from "./apodApi";

const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${
  import.meta.env.VITE_API
}`;

export type TApod = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
};

export const ApodPage = () => {
  const [apod, setApod] = useState<TApod>();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");

  useEffect(() => {
    async function fetchAndSetApod() {
      const apod = await fetchApod(dateParam);
      if (apod) {
        setApod(apod);
        setSearchParams({ date: apod.date });
      }
    }

    fetchAndSetApod();
  }, [dateParam]);

  const onChangeDate = async (propsDate: Date | null) => {
    if (propsDate) {
      const date = new Date(propsDate);
      date.setDate(date.getDate());
      const formattedDate = date.toISOString().slice(0, 10);

      const newApod = await fetchApodDate(formattedDate);

      if (newApod) {
        setApod(newApod);
        setSearchParams({ date: newApod.date });
      }
    }
  };

  const onChangeRandom = async () => {
    const newApod = await fetchApodRandom();

    if (newApod) {
      setApod(newApod);
      setSearchParams({ date: newApod.date });
    }
  };

  if (!apod) {
    return <div>Loading...</div>;
  }

  return (
    <Apod
      data={apod}
      onChangeDate={onChangeDate}
      onChangeRandom={onChangeRandom}
    />
  );
};
