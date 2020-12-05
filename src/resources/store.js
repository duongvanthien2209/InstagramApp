import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auths/authSlide';
import articleSlide from './articles/articleSlide';

const rootReducer = {
  auth: authReducer,
  article: articleSlide,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
