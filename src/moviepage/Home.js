import React from "react";
import { useEffect } from "react";
import getMovieApi from "../reducer/waiteAction/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../component/Banner";
import MovieSlide from "../component/MovieSlide";
import "react-multi-carousel/lib/styles.css";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popular, toRated, upcoming } = useSelector(
    (state) => state.movielist
  );
  const loading = useSelector((state) => state.movielist.loading);

  useEffect(() => {
    dispatch(getMovieApi());
  }, []);

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
      {popular.results && <Banner bannerInfo={popular.results[0]} />}
      <div className="homeContainer">
        <MovieSlide item={popular} title={`Popular Movies`} />

        <MovieSlide item={toRated} title={`Top rated Movies`} />

        <MovieSlide item={upcoming} title={`Upcoming Movies`} />
      </div>
    </div>
  );
};

export default Home;
