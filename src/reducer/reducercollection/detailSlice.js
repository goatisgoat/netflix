import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  detailItem: {},
  trailerAction: '',
  reviewInfo: [],
  relatedInfo: [],
  detailLoading: true,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    getDetailInfo(state, action) {
      state.detailItem = action.payload.detailInfo.data;
      state.trailerAction = action.payload.trailerInfo.data.results[0].key;
      state.reviewInfo = action.payload.reviewInfo.data.results;
      state.relatedInfo = action.payload.relatedInfo.data.results;
      state.detailLoading = false
    },

    detailLoading(state, action) {
      state.detailLoading = action.payload.loading;
    },
  }
});

export const detailpass = detailSlice.actions;
export default detailSlice.reducer;
