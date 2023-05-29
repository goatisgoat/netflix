import React from "react";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieSlideComponenet = ({ item }) => {
  const { genreList } = useSelector((state) => state.movielist);
  const navigate = useNavigate();

  const gotoDetail = () => {
    navigate(`/movies/${item.id}/?q=${item.id}`);
  };
  return (
    <div onClick={gotoDetail}>
      <div
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w1280/${item.backdrop_path})`,
          color: "white",
        }}
        className="slideImg"
      >
        <div className="overlay">
          <h3 className="sildeTitle">{item.title}</h3>
          <hr className="hrborder" />

          <div>
            {item.genre_ids.map((a) => (
              <Badge className="badgebar" pill bg="danger">
                {genreList &&
                  genreList.map((item) => (item.id === a ? item.name : ""))}
              </Badge>
            ))}
          </div>

          <div className="sildeBotton">
            <div>
              <FontAwesomeIcon icon={faStar} />
              {item.vote_average}
              <FontAwesomeIcon className="bottompadding" icon={faUsers} />{" "}
              {item.vote_count}
              {item.adult ? "19" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlideComponenet;
