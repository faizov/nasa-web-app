import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  addOrRemoveItemLocalStorage,
  findObjectInLocalStorageArray,
} from "../../utils/localStorage";

import IconHeart from "../../assets/icons/icon-heart.svg";
import IconHeartActive from "../../assets/icons/icon-heart-active.svg";

import "./styles.scss";
import { TApod } from "./";

type Props = {
  data: TApod;
  onClickNextOrPrevDate: (_: boolean) => void;
  onChangeDate: (_: Date | null) => void;
  onChangeRandom: () => void;
};

export const Apod = ({
  data,
  onClickNextOrPrevDate,
  onChangeDate,
  onChangeRandom,
}: Props) => {
  const [liked, setLiked] = useState(false);

  const isDisabledNextDate =
    data && new Date(data.date).toDateString() === new Date().toDateString();
  const isDisabledBackDate =
    data && new Date(data.date) <= new Date("1995-06-16");

  useEffect(() => {
    if (data) {
      const likeItem = findObjectInLocalStorageArray("likesApod", data.date);
      setLiked(Boolean(likeItem));
    }
  }, [data]);

  const onClickLike = () => {
    setLiked(!liked);

    addOrRemoveItemLocalStorage("likesApod", { ...data, id: data.date }, liked);
  };

  return (
    <div className="apod">
      <div className="info">
        <div className="info__header">
          <DatePicker
            selected={new Date(data.date)}
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
          <h1>{data.title}</h1>
        </div>

        <div className="explanation">
          <Scrollbars style={{ height: "100%" }}>
            <p>{data.explanation}</p>
          </Scrollbars>
        </div>

        <div className="buttons">
          <button
            onClick={() => onClickNextOrPrevDate(false)}
            disabled={isDisabledBackDate}
            className={`${isDisabledBackDate && "disabled"}`}
          >
            prev
          </button>
          <button onClick={() => onChangeRandom()}>random</button>
          <button
            onClick={() => onClickNextOrPrevDate(true)}
            disabled={isDisabledNextDate}
            className={`${isDisabledNextDate && "disabled"}`}
          >
            next
          </button>
        </div>
      </div>
      <div className="media">
        <a
          href={data.hdurl || data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.media_type === "image" ? (
            <img src={data.hdurl || data.url} alt="" loading="lazy" />
          ) : (
            <iframe
              src={data.url}
              style={{
                overflow: "hidden",
                height: "100%",
                width: "100%",
                border: "none",
              }}
              height="100%"
              width="100%"
            ></iframe>
          )}
        </a>
        {data.copyright && (
          <div className="credit">Copyright: {data.copyright}</div>
        )}
      </div>
    </div>
  );
};
