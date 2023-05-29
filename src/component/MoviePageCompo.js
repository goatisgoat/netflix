import React from "react";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MoviePageCompo = ({ item, moviePageGenredata }) => {
  // 영화페이지 카드 컴포넌트
  let year = item.release_date;
  const navigate = useNavigate()

  const gotoDetail = () => {
    navigate(`/movies/${item.id}/?q=${item.id}`);
  };

  return (
    <div
    onClick={gotoDetail}
      className="moviePageCards"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/original/${item.backdrop_path})`,
      }}
    >
      <div style={{ display: "flex", margin: 10 }}>
        <div
          style={{
            backgroundImage: `url( https://image.tmdb.org/t/p/w440_and_h660_face/${item.poster_path})`,
            width: 75,
            height: 100,
            marginRight: 10,
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: 'relative'
          }}
        ></div>
        <div className="moviePageTitle">
          {item.title.length < 15
            ? item.title
            : item.title.slice(0, 14) + "..."}
          <p style={{ fontSize: 15 }}>
            {year === undefined ? "" : year.substr(0, 4)}
          </p>
        </div>
      </div>
      <div className="moviePageBadge">
        {item.genre_ids.map((item) => {
          return (
            <Badge pill bg="danger" className="moviePageBadgeCompo">
              {moviePageGenredata.find((genre) => genre.id === item).name}
            </Badge>
          );
        })}
      </div>
      <div className="moviePageOverview">{item.overview.slice(0, 70)}...</div>

      <div className="moviePageCardbottom">
        <FontAwesomeIcon icon={faStar} />
        {item.vote_average}
        <FontAwesomeIcon className="bottompadding" icon={faUsers} />{" "}
        {item.vote_count}
        &nbsp; &nbsp; &nbsp;
        {item.adult ? "19" : "under 19"}
      </div>
    </div>
  );
};

export default MoviePageCompo;
