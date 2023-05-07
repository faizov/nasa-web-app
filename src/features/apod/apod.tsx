import React, { ChangeEvent, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  useGetApodQuery,
  useLazyGetApodRandomQuery,
  useLazyGetApodDateQuery,
} from "./apodApi";

import {
  addOrRemoveItemLocalStorage,
  findObjectInLocalStorageArray,
} from "../../utils/localStorage";

import IconHeart from "../../assets/icons/icon-heart.svg";
import IconHeartActive from "../../assets/icons/icon-heart-active.svg";

import "./styles.scss";

export const Apod = () => {
  const { data, error, isLoading } = useGetApodQuery("");
  const [apod, setApod] = useState(data);
  const [clickRandom] = useLazyGetApodRandomQuery();
  const [clickDate] = useLazyGetApodDateQuery();

  const [liked, setLiked] = useState(false);

  const isDisabledNextDate =
    apod && new Date(apod.date).toDateString() === new Date().toDateString();
  const isDisabledBackDate =
    apod && new Date(apod.date) <= new Date("1995-06-16");

  useEffect(() => {
    if (data) {
      setApod(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (apod) {
      const likeItem = findObjectInLocalStorageArray("likesApod", apod.date);

      setLiked(Boolean(likeItem));
    }
  }, [apod]);

  const onClickRandom = async () => {
    const result = await clickRandom("");

    if (result) {

      setApod(result.data[0]);
    }
  };

  const onClickNextorPrevDate = async (direction: boolean) => {
    const date = new Date(apod.date);
    const operation = direction ? 1 : -1;

    date.setDate(date.getDate() + operation);
    const formattedDate = date.toISOString().slice(0, 10);

    const result = await clickDate(formattedDate);

    if (result) {
      setApod(result.data);
    }
  };

  const onChangeDate = async (propsDate: Date | null) => {
    if (propsDate) {
      const date = new Date(propsDate);
      date.setDate(date.getDate());
      const formattedDate = date.toISOString().slice(0, 10);
      const result = await clickDate(formattedDate);

      if (result && !result.error) {
        setApod(result.data);
      }

      if (result.error) {
        date.setDate(date.getDate() - 1);
        const formattedDate = date.toISOString().slice(0, 10);
        const result = await clickDate(formattedDate);
        return setApod(result.data);
      }
    }
  };

  const onClickLike = () => {
    setLiked(!liked);

    addOrRemoveItemLocalStorage("likesApod", { ...apod, id: apod.date }, liked);
  };

  if (isLoading || error || !data || !apod) {
    return <></>;
  }

  return (
    <div className="apod">
      <div className="info">
        <div className="info__header">
          <DatePicker
            selected={new Date(apod.date)}
            onChange={(date) => onChangeDate(date)}
            maxDate={new Date()}
            minDate={new Date("1995/06/16")}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            className="date"
            showPopperArrow={false}
          />

          <div>
            <button
              className={`info__header__like ${liked ? "active" : ""}`}
              onClick={() => onClickLike()}
            >
              <img src={liked ? IconHeartActive : IconHeart} alt="" />
            </button>
          </div>
        </div>

        <div className="title">
          <h1>{apod.title}</h1>
        </div>

        <div className="explanation">
          <Scrollbars style={{ height: "100%" }}>
            <p>{apod.explanation}</p>
          </Scrollbars>
        </div>

        <div className="buttons">
          <button
            onClick={() => onClickNextorPrevDate(false)}
            disabled={isDisabledBackDate}
            className={`${isDisabledBackDate && "disabled"}`}
          >
            prev
          </button>
          <button onClick={onClickRandom}>random</button>
          <button
            onClick={() => onClickNextorPrevDate(true)}
            disabled={isDisabledNextDate}
            className={`${isDisabledNextDate && "disabled"}`}
          >
            next
          </button>
        </div>
      </div>
      <div className="media">
        <a
          href={apod.hdurl || apod.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {apod.media_type === "image" ? (
            <img src={apod.hdurl || apod.ulr} alt="" loading="lazy" />
          ) : (
            <iframe
              src={apod.ulr}
              style={{ overflow: "hidden", height: "100%", width: "100%" }}
              height="100%"
              width="100%"
            ></iframe>
          )}
        </a>
        {apod.copyright && (
          <div className="credit">Сopyright: {apod.copyright}</div>
        )}
      </div>
    </div>
  );
};
