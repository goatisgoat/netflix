import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faUsers,
  faTriangleExclamation,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import getDetailApi from "../reducer/waiteAction/detailAction";
import ClipLoader from "react-spinners/ClipLoader";
import BadgeComponent from "../component/BadgeComponent";
import DetailModal from "../component/DetailModal";
import ReviewSelected from "../component/ReviewSelected";

const MovieDetail = () => {
  const { detailLoading, detailItem } = useSelector((state) => state.detail);
  const { genreList } = useSelector((state) => state.movielist);
  const dispatch = useDispatch();
  const [quary, setquary] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  let search = quary.get("q") || "";
  // 쿼리값으로 영화 디테일 페이지 api접근

  // 영화 디테일 페이지 버튼을 객체로
  const lastbadge = {
    budget: detailItem.budget,
    revenue: detailItem.revenue,
    release_date: detailItem.release_date,
    runtime: detailItem.runtime,
  };

  // 쿼리값으로 영화 디테일 페이지 api접근
  const getDetailInfo = () => {
    dispatch(getDetailApi(search));
  };

  // 쿼리값으로 영화 디테일 페이지 api접근
  useEffect(() => {
    getDetailInfo();
  }, []);

  // 모달박스 변수
  const passModalState = () => {
    setIsOpen(true);
  };

  if (detailLoading) {
    return (
      <ClipLoader
        className="spinner"
        color="red"
        loading={true}
        // cssOverride={}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div>
      <div className="detailmain">
        <h1>Netflix</h1>
        <input type="text" placeholder="SEARCH"></input>
      </div>
      <Container>
        <Row>
          <Col lg={6} className="detainContainer">
            <img
              src={`https://www.themoviedb.org/t/p/w1280/${detailItem.poster_path}`}
            ></img>
          </Col>
          <Col lg={6} className="detainContainer">
            <div className="detailBoxStringTop">
              {detailItem.genres.map((item) => {
                return (
                  <Badge
                    style={{ fontSize: 14 }}
                    className="detailbadge"
                    pill
                    bg="danger"
                    text="dark"
                  >
                    {item.name}
                  </Badge>
                );
              })}

              <p>{detailItem.title}</p>
              <h4>{detailItem.tagline}</h4>

              <div className="drtailFont">
                {" "}
                <FontAwesomeIcon style={{ color: "#ecdc4c" }} icon={faStar} />
                {detailItem.vote_average}
                &nbsp;
                <FontAwesomeIcon
                  className="bottompadding"
                  icon={faUsers}
                />{" "}
                {detailItem.vote_count}
                &nbsp;&nbsp;&nbsp; &nbsp;
                {detailItem.adult
                  ? (
                      <FontAwesomeIcon
                        style={{ color: "#E2264D" }}
                        icon={faTriangleExclamation}
                      />
                    ) + "19"
                  : "under 19"}
              </div>
            </div>

            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <p>{detailItem.overview}</p>
            </div>

            <div className="bottomDetailbadge">
              <BadgeComponent lastbadge={lastbadge} />
            </div>

            <div className="likeAndtTrailer">
              {/* 모달박스 */}
              <DetailModal isOpen={isOpen} setIsOpen={setIsOpen} />
              <a onClick={passModalState}>
                {" "}
                <FontAwesomeIcon style={{ color: "red" }} icon={faVideo} />{" "}
                Watch Trailer
              </a>
              {/* 하트버튼 */}
              <div className="detailHeart">
                <input type="checkbox" class="checkbox" id="checkbox" />
                <label for="checkbox">
                  <svg
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Group"
                      fill="none"
                      fill-rule="evenodd"
                      transform="translate(467 392)"
                    >
                      <path
                        id="heart"
                        d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                        fill="#AAB8C2"
                      />
                      <circle
                        id="main-circ"
                        fill="#E2264D"
                        opacity="0"
                        cx="29.5"
                        cy="29.5"
                        r="1.5"
                      />

                      <g id="grp7" opacity="0" transform="translate(7 6)">
                        <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                        <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                      </g>

                      <g id="grp6" opacity="0" transform="translate(0 28)">
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                        <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                      </g>

                      <g id="grp3" opacity="0" transform="translate(52 28)">
                        <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                        <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                      </g>

                      <g id="grp2" opacity="0" transform="translate(44 6)">
                        <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                        <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp5" opacity="0" transform="translate(14 50)">
                        <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                        <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp4" opacity="0" transform="translate(35 50)">
                        <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                        <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                      </g>

                      <g id="grp1" opacity="0" transform="translate(24)">
                        <circle
                          id="oval1"
                          fill="#9FC7FA"
                          cx="2.5"
                          cy="3"
                          r="2"
                        />
                        <circle
                          id="oval2"
                          fill="#9FC7FA"
                          cx="7.5"
                          cy="2"
                          r="2"
                        />
                      </g>
                    </g>
                  </svg>
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <ReviewSelected />
      </div>
    </div>
  );
};

export default MovieDetail;
