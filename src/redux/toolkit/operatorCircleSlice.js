// src/redux/operatorCircleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operator: null,
  circle: null,
};

const operatorCircleSlice = createSlice({
  name: 'operatorCircle',
  initialState,
  reducers: {
    setOperator(state, action) {
      state.operator = action.payload;
    },
    setCircle(state, action) {
      state.circle = action.payload;
    },
  },
});

export const { setOperator, setCircle } = operatorCircleSlice.actions;

export default operatorCircleSlice.reducer;
