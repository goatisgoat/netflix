import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import getMoviePageApi from "../reducer/waiteAction/moviePageAction";
import { useDispatch, useSelector } from "react-redux";
import MoviePageCompo from "../component/MoviePageCompo";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactSlider from "react-slider";
import { moviePagePass } from "../reducer/reducercollection/moviePageSlice";

// 슬라이드 막대 변수
const yearMIN = 1999;
const yearMAX = 2023;

// 슬라이드 막대 변수
const scoreMIN = 0;
const scoreMAX = 10;

const Movies = () => {
  const dispatch = useDispatch();
  const { moviePage, loading, moviePageGenredata, searchInfo } = useSelector(
    (state) => state.moviePage
  );

  // moviePage의 데이터 복사
  const [filteredMovie, setFilteredMovie] = useState([]);

  // navigation에서 api에 넘겨줬던 searchInfo를 찾아오기
  useEffect(() => {
    dispatch(getMoviePageApi(searchInfo));
  }, []);

  // moviePage의 데이터가 도착하면 변수에 저장
  useEffect(() => {
    setFilteredMovie(moviePage);
  }, [moviePage]);

  const [currentPage, setCurrentPage] = useState(1);
  const showPageNum = 6;
  const lastIndex = currentPage * showPageNum;
  const firstIndex = lastIndex - showPageNum;
  const npage = Math.ceil(filteredMovie.length / showPageNum);
  const records = filteredMovie.slice(firstIndex, lastIndex);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }

    if (currentPage !== 1 && currentPage === minpageNumLimit) {
      setMaxPageNumLimit(maxpageNumLimit - pageNumLimit);
      setMinPageNumLimit(minpageNumLimit - pageNumLimit);
    }
  };

  const changeCPage = (n) => {
    setCurrentPage(n);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage !== npage && currentPage > maxpageNumLimit - 1) {
      setMaxPageNumLimit(maxpageNumLimit + pageNumLimit);
      setMinPageNumLimit(minpageNumLimit + pageNumLimit);
    }
  };

  const [pageNumLimit, setPageNumLimit] = useState(5);
  const [maxpageNumLimit, setMaxPageNumLimit] = useState(5);
  const [minpageNumLimit, setMinPageNumLimit] = useState(1);

  const pageNum = numbers.map((n, i) =>
    minpageNumLimit <= n && n <= maxpageNumLimit ? (
      <li className={`pageItem ${currentPage === n ? "active" : ""}`} key={i}>
        <a href="#" className="pageItem" onClick={() => changeCPage(n)}>
          {n}
        </a>
      </li>
    ) : null
  );

  // sort,filter
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);

  const [yeatValue, setYearValue] = useState([yearMIN, yearMAX]);
  const [scoreValue, setScoreValue] = useState([scoreMIN, scoreMAX]);

  // year슬라이드 구현
  useEffect(() => {
    if (filter) {
      setFilteredMovie(
        moviePage.filter((itemsss) => {
          let year = itemsss.release_date;
          if (year) {
            return (
              yeatValue[0] < Number(year.slice(0, 4)) &&
              Number(year.slice(0, 4)) < yeatValue[1]
            );
          }
        })
      );
    }
  }, [yeatValue]);

  // score슬라이드 구현
  useEffect(() => {
    if (filter) {
      setFilteredMovie(
        moviePage.filter((itemsss) => {
          let score = itemsss.vote_average;
          if (score) {
            return (
              scoreValue[0] < Math.floor(score) &&
              Math.floor(score) < scoreValue[1]
            );
          }
        })
      );
    }
  }, [scoreValue]);

  // 드롭박스 구현
  const [select, setSelect] = useState("");

  // 드롭박스 정보 보내줌
  useEffect(() => {
    if (moviePage) {
      dispatch(moviePagePass.pageSort({ moviePage, select }));
    }
  }, [select]);

  const handleSelect = (e) => {
    if (e.target.value !== "none") {
      setSelect(e.target.value);
    }
  };

  // 장르버튼
  const genreBtn = (e) => {
    console.log(e.target.id, "btn");
    setFilteredMovie(
      moviePage.filter((item) => {
        return item.genre_ids.find((a) =>
          a === Number(e.target.id) ? true : false
        );
      })
    );
  };

  if (loading) {
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
      <Container>
        <Row>
          <Col lg={2} className="moviePageLeft">
            <div className="sortContainer">
              <div className="sortBox">
                <h4>Sort</h4>

                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="Arrow"
                  onClick={() =>
                    sort === false ? setSort(true) : setSort(false)
                  }
                />
              </div>
              {sort === true ? (
                <div className="innerSortBox">
                  <select onChange={(e) => handleSelect(e)}>
                    <option>none</option>
                    <option>popularity</option>
                    <option>release_date</option>
                    <option>vote_average</option>
                    <option>vote_count</option>
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="filterContainer">
              <div className="filterBox">
                <h4>Filter</h4>
                <FontAwesomeIcon
                  className="Arrow"
                  icon={faArrowRight}
                  onClick={() =>
                    filter === false ? setFilter(true) : setFilter(false)
                  }
                />
              </div>
              {filter === true ? (
                <div className="innerFilterBox">
                  <div className="container">
                    <h3>YEAR Filter</h3>
                    {yeatValue[0]} ~{yeatValue[1]}
                    <ReactSlider
                      className="slider"
                      onChange={setYearValue}
                      value={yeatValue}
                      min={yearMIN}
                      max={yearMAX}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {filter === true ? (
                <div className="innerFilterBox">
                  <div className="container">
                    <h3>IBM Score Filter</h3>
                    {scoreValue[0]} ~{scoreValue[1]}
                    <ReactSlider
                      className="slider"
                      onChange={setScoreValue}
                      value={scoreValue}
                      min={scoreMIN}
                      max={scoreMAX}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {filter === true ? (
                <div className="genreFilterBox">
                  <h3>genre</h3>
                  {moviePageGenredata.map((item) => {
                    return (
                      <button onClick={(e) => genreBtn(e)} id={item.id}>
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col lg={8} className="moviePageContainer">
            {records.map((item) => {
              return (
                <MoviePageCompo
                  item={item}
                  moviePageGenredata={moviePageGenredata}
                />
              );
            })}
          </Col>

          <nav>
            <ul className="pagination">
              <li className="pageItem">
                <a href="#" className="pageLink" onClick={prePage}>
                  <FontAwesomeIcon icon={faCircleChevronLeft} />
                </a>
              </li>
              {pageNum}

              <li className="pageItem">
                <a href="#" className="pageLink" onClick={nextPage}>
                  <FontAwesomeIcon icon={faCircleChevronRight} />
                </a>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </div>
  );
};

export default Movies;
