/* eslint-disable import/prefer-default-export */
import axiosClient from './apiClient';

const END_POINT = '/comment';

export const getCommentByArticleId = (articleId) => {
  const url = `${END_POINT}/${articleId}`;
  return axiosClient.get(url);
};

export const createComment = ({ comment, articleId }) => {
  const url = `${END_POINT}/${articleId}`;
  return axiosClient.post(url, { text: comment });
};
