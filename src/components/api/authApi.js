/* eslint-disable import/prefer-default-export */
import axiosClient from './apiClient';

const API_ENDPOINT = '/auth';

export const getToken = (data) => {
  const url = `${API_ENDPOINT}/login`;
  return axiosClient.post(url, data);
};

export const register = (data) => {
  const url = `${API_ENDPOINT}/register`;
  return axiosClient.post(url, data);
};
