/* eslint-disable import/prefer-default-export */
import axiosClient from './apiClient';

const END_POINT = '/article';

export const getArticles = () => {
  return axiosClient.get(END_POINT);
};

export const createArticle = (formData) => {
  return axiosClient.post(END_POINT, formData);
};
