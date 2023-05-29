import {api} from "../api";
import { passActon } from "../reducercollection/productSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovieApi() {
  return async (dispatch) => {
    dispatch(passActon.loading({ loading: true }));

    const popular = api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const topRated = api.get(
      `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    const upComung = api.get(
      `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    const getGenreApi = api.get(
      `/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    let [popularMovies, topRatedMovies, upcomingMovies, genreList] =
      await Promise.all([popular, topRated, upComung, getGenreApi]);
    dispatch(
      passActon.getMainApi({
        popularMovies: popularMovies.data,
        topRatedMovies: topRatedMovies.data,
        upcomingMovies: upcomingMovies.data,
        genreList: genreList.data,
      })
    );
  };
}

export default getMovieApi;
