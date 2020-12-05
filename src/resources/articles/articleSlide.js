/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit');

const article = createSlice({
  name: 'article',
  initialState: {
    articles: [],
  },
  reducers: {
    addArticles: (state, action) => {
      state.articles = action.payload;
    },
    addArticle: (state, action) => {
      state.articles.unshift(action.payload);
    },
  },
});

const { reducer, actions } = article;
export const { addArticles, addArticle } = actions;
export default reducer;
