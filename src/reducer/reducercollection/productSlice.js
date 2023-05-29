import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  popular: {},
  toRated: {},
  upcoming: {},
  genreList: [],
  loading: true,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getMainApi(state, action) {
      state.popular = action.payload.popularMovies;
      state.toRated = action.payload.topRatedMovies;
      state.upcoming = action.payload.upcomingMovies;
      state.genreList = action.payload.genreList.genres;
      state.loading = false
      
    },
    loading(state, action) {
      state.loading = action.payload.loading
    },
  
  }


});

export const passActon =  productSlice.actions;
export default productSlice.reducer;
