import React, { useCallback, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import {
  addOrRemoveItemLocalStorage,
  getAllArrayLocalStorage,
} from "../../utils/localStorage";
import { TApod } from "../apod";

import IconDelete from "../../assets/icons/icon-delete.svg";
import ImageNotFoundDark from "../../assets/images/404-dark.svg";
import ImageNotFoundLight from "../../assets/images/404-light.svg";

import "./styles.scss";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";

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
      <div className="not-found">
        <h1>No favorite items yet.</h1>
        <p>Add some to start collecting!</p>
        <img src={darkMode ? ImageNotFoundDark : ImageNotFoundLight} alt="" />
      </div>
    );
  }

  return (
    <div className="likes">
      <Scrollbars style={{ height: "80vh" }}>
        <div className="list-item">
          {state &&
            state.map((item: TApod) => {
              return (
                <div className="item" key={item.date}>
                  <Link to={`/?date=${item.date}`}>
                    {item.media_type === "image" ? (
                      <img
                        src={item.url}
                        className="image"
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div className="video">
                        <p>Video: {item.title}</p>
                      </div>
                    )}
                  </Link>

                  <div className="delete" onClick={() => deleteLike(item.date)}>
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
