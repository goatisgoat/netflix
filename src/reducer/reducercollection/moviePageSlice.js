import { createSlice,current } from "@reduxjs/toolkit";
import { moviePage } from "../api";

let initialState = {
  moviePage: [],
  moviePageGenredata: [],
  loading: true,
  searchInfo:'',
};

const moviePageSlice = createSlice({
  name: "moviePage",
  initialState,
  reducers: {
    getMoviePageApi(state, action) {
      state.moviePage = action.payload.arr;
      state.moviePageGenredata = action.payload.moviePageGenreApi.data.genres;
      state.loading = false;
    },
    loading(state, action) {
      state.loading = true;
    },
    pageSort(state, action) {
      let whatSort = action.payload.select;
      state.moviePage = [...action.payload.moviePage].sort(
        (a, b) => b[whatSort] - a[whatSort]
      );
    },

    search(state, action) {
      state.searchInfo = action.payload.search
      console.log(state.searchInfo, 'state.searchInfo')
    },

    getMoviePageSearcg(state, action) {
      state.moviePage = action.payload.moviePageSearch.data.results;
      state.moviePageGenredata = action.payload.moviePageGenreApi.data.genres;
      state.loading = false;
    }
  },
});

export const moviePagePass = moviePageSlice.actions;
export default moviePageSlice.reducer;
