import { moviePage, api } from "../api";
import { moviePagePass } from "../reducercollection/moviePageSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMoviePageApi(search) {
  // 검색창에 글씨가 있으면 실행
  if (search) {
    console.log(search, 'search')
    return async (dispatch) => {
      dispatch(moviePagePass.loading({}));

      let moviePageGenreApi = await api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      let moviePageSearch = await moviePage.get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
      );

      dispatch(
        moviePagePass.getMoviePageSearcg({
          moviePageGenreApi,
          moviePageSearch,
        })
      );
  
    };
    // 검색창에 글씨가 없으면 실행
  } else if (search === null) {
    return async (dispatch) => {
      dispatch(moviePagePass.loading({}));

      const moviePageGenreApi = await api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      let arr = [];
      for (let i = 1; i <= 20; i++) {
        let moviePageInfo1 = await moviePage.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`
        );
        arr = [...arr, ...moviePageInfo1.data.results];
      }

      dispatch(
        moviePagePass.getMoviePageApi({
          arr,
          moviePageGenreApi,
        })
      );

      // const moviePageInfo1 = moviePage.get(
      //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      // );
      // const moviePageInfo2 = moviePage.get(
      //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2"
      // );
      // const moviePageInfo3 = moviePage.get(
      //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3"
      // );
      // const moviePageInfo4 = moviePage.get(
      //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=4"
      // );
      // const moviePageInfo5 = moviePage.get(
      //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=5"
      // );

      // let [
      //   moviePageData1,
      //   moviePageData2,
      //   moviePageData3,
      //   moviePageData4,
      //   moviePageData5,
      //   moviePageGenredata,
      // ] = await Promise.all([
      //   moviePageInfo1,
      //   moviePageInfo2,
      //   moviePageInfo3,
      //   moviePageInfo4,
      //   moviePageInfo5,
      //   moviePageGenreApi
      // ]);
      // dispatch(
      //   moviePagePass.getMoviePageApi({
      //     moviePageData1,
      //     moviePageData2,
      //     moviePageData3,
      //     moviePageData4,
      //     moviePageData5,
      //     moviePageGenredata
      //   })
      // );
    };
  }
}
export default getMoviePageApi;
