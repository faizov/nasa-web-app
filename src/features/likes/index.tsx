import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import Scrollbars from "react-custom-scrollbars-2";

import {
  addOrRemoveItemLocalStorage,
  getAllArrayLocalStorage,
} from "../../utils/localStorage";

import IconDelete from "../../assets/icons/icon-delete.svg";
import ImageNotFoundDark from "../../assets/images/404-dark.svg";
import ImageNotFoundLight from "../../assets/images/404-light.svg";

import { TApod } from "../apod";
import style from "./styles.module.scss";

const LikesPage = () => {
  const [state, setState] = useState([]);
  const darkMode = useReadLocalStorage("darkMode");

  const deleteLike = (id: string) => {
    addOrRemoveItemLocalStorage("likesApod", { ...state, id }, true);
    fetchData();
  };

  const fetchData = useCallback(() => {
    const data = getAllArrayLocalStorage("likesApod");

    if (data) {
      setState(data.reverse());
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (state.length < 1) {
    return (
      <div className={style.notFound}>
        <h1>No favorite items yet.</h1>
        <p>Add some to start collecting!</p>
        <img src={darkMode ? ImageNotFoundDark : ImageNotFoundLight} alt="" />
      </div>
    );
  }

  return (
    <div className={style.likes}>
      <Scrollbars style={{ height: "80vh" }}>
        <div className={style.listItems}>
          {state &&
            state.map((item: TApod) => {
              return (
                <div key={item.date} className={style.item}>
                  <Link to={`/?date=${item.date}`}>
                    {item.media_type === "image" ? (
                      <img
                        src={item.url}
                        className={style.image}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div className={style.video}>
                        <p>Video: {item.title}</p>
                      </div>
                    )}
                  </Link>

                  <div
                    className={style.delete}
                    onClick={() => deleteLike(item.date)}
                  >
                    <img src={IconDelete} alt="delete" />
                  </div>
                </div>
              );
            })}
        </div>
      </Scrollbars>
    </div>
  );
};

export default LikesPage;
