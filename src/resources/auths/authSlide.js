/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLogin: false,
  },
  reducers: {
    addLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = auth;
export const { addLogin } = actions;
export default reducer;
