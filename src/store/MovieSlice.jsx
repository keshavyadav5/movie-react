import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerData: [],
  imageURL : ""
};

const movieSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL : (state,action) => {
      state.imageURL = action.payload;
    }
  },
});

export const { setBannerData, setImageURL } = movieSlice.actions;
export default movieSlice.reducer;
