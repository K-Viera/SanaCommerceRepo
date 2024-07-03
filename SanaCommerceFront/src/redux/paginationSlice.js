import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  endCursor: null,
  currentCursor: null,
  previousCursor: null,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setEndCursor(state, action) {
      state.endCursor = action.payload;
    },
    setPreviousCursor(state, action) {
      state.previousCursor = action.payload;
    },
    setCurrentCursor(state, action) {
      state.currentCursor = action.payload;
    }
  },
});

export const {setEndCursor, setPreviousCursor, setCurrentCursor } = paginationSlice.actions;

export default paginationSlice.reducer;
