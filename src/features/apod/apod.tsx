import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useGetApodQuery, useLazyGetApodRandomQuery } from "./apodApi";

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
  const [trigger] = useLazyGetApodRandomQuery();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (data) {
      setApod(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (apod) {
      const likeItem = findObjectInLocalStorageArray("likesApod", apod.date);
      console.log('likeItem', likeItem)
      setLiked(Boolean(likeItem));
    }
  }, [apod]);

  if (error || !data || !apod) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <></>;
  }

  const onClickHandler = async () => {
    const result = await trigger("");

    if (result) {
      console.log("result", result);
      setApod(result.data[0]);
    }
  };

  const onClickLike = () => {
    setLiked(!liked);

    addOrRemoveItemLocalStorage("likesApod", apod, liked);
  };

  return (
    <div className="apod">
      <div className="info">
        <div className="info__header">
          <span className="date">{apod.date}</span>
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
          <button className="disabled" disabled>
            prev
          </button>
          <button onClick={onClickHandler}>random</button>
          <button className="disabled" disabled>
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
