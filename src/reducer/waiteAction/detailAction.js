import { options, trailer } from "../api";
import { detailpass } from "../reducercollection/detailSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

function getDetailApi(search) {
  return async (dispatch) => {
    dispatch(detailpass.detailLoading({ loading: true }));
    const detailAction = options.get(
      `https://api.themoviedb.org/3/movie/${search}`
    );

    const trailerAction = trailer.get(
      `https://api.themoviedb.org/3/movie/${search}/videos?api_key=${API_KEY}&language=en-US`
    );

    const reviewAction = options.get(
      `https://api.themoviedb.org/3/movie/${search}/reviews?language=en-US&page=1`
    );

    const relatedAction = options.get(
      `https://api.themoviedb.org/3/movie/${search}/recommendations?language=en-US&page=1`
    );

    let [detailInfo, trailerInfo, reviewInfo, relatedInfo] = await Promise.all([
      detailAction,
      trailerAction,
      reviewAction,
      relatedAction,
    ]);

    dispatch(
      detailpass.getDetailInfo({
        detailInfo,
        trailerInfo,
        reviewInfo,
        relatedInfo,
      })
    );
  };
}

export default getDetailApi;
