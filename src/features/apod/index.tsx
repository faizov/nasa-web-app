import React, { useCallback, useEffect, useState } from "react";
import { Apod } from "./apod";
import { useSearchParams } from "react-router-dom";

import { fetchApod, fetchApodDate, fetchApodRandom } from "./apodApi";

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

  const fetchData = useCallback(async () => {
    const apod = await fetchApod(dateParam);
    if (apod) {
      setApod(apod);
      setSearchParams({ date: apod.date });
    }
  }, [dateParam]);

  useEffect(() => {
    fetchData();
  }, []);

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
