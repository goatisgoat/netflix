import { moviePage, api } from "../api";
import { moviePagePass } from "../reducercollection/moviePageSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMoviePageApi(search) {
  // 검색창에 글씨가 있으면 실행
  if (search) {
    console.log(search, "search");
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

      let URL1 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      let URL2 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2";
      let URL3 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3";
      let URL4 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=4";
      let URL5 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=5";
      let URL6 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=6";
      let URL7 =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=7";

      const fetchURL = (url) => moviePage.get(url);

      const promiseArray = [URL1, URL2, URL3, URL4, URL5, URL6, URL7].map(
        fetchURL
      );

      let arr = [];
      Promise.all(promiseArray)
        .then((data) => {
          arr = [
            ...data[0].data.results,
            ...data[1].data.results,
            ...data[2].data.results,
            ...data[3].data.results,
            ...data[4].data.results,
            ...data[5].data.results,
            ...data[6].data.results,
          ];
          console.log(arr);
          dispatch(
            moviePagePass.getMoviePageApi({
              arr,
              moviePageGenreApi,
            })
          );
        })
        .catch((err) => {});


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
