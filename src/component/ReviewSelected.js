import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const ReviewSelected = () => {
  const [show, setShoew] = useState(true);
  const { reviewInfo, relatedInfo } = useSelector((state) => state.detail);
  const { genreList } = useSelector((state) => state.movielist);

  return (
    <div className={show === true ? "reviewContainer" : "relatedContainer"}>
      <div className="ReviewButton">
        <Button onClick={() => setShoew(true)} variant="outline-danger">
          review
        </Button>
        <Button onClick={() => setShoew(false)} variant="outline-danger">
          selected Movies
        </Button>
      </div>

      {show &&
        reviewInfo.map((a, index) => {
          return index < 6 ? (
            <div className="reviewBox"> {a.content} </div>
          ) : (
            ""
          );
        })}

      {!show && (
        <div className="relatedBox">
          {relatedInfo.map((item) => {
            return (
              <div
                onClick={() =>
                  window.location.replace(`/movies/${item.id}/?q=${item.id}`)
                }
                style={{
                  backgroundImage: `url( https://www.themoviedb.org/t/p/w1280/${item.backdrop_path})`,
                  color: "white",
                }}
                className="slideImg reviewImg"
              >
                <div className="relatedOverlay">
                  <h3 className="sildeTitle">{item.title}</h3>
                  <hr className="hrborder" />

                  <div>
                    {item.genre_ids.map((a) => (
                      <Badge className="badgebar" pill bg="danger">
                        {genreList &&
                          genreList.map((item) =>
                            item.id === a ? item.name : ""
                          )}
                      </Badge>
                    ))}
                  </div>
                  <div className="sildeBotton">
                    <div>
                      <FontAwesomeIcon icon={faStar} />
                      {item.vote_average}
                      <FontAwesomeIcon
                        className="bottompadding"
                        icon={faUsers}
                      />{" "}
                      {item.vote_count}
                      {item.adult ? "19" : ""}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewSelected;
