import axios from "axios";
import { config } from "../config";

const API_URL = config.BASE_API_URL + "/api/blog";

export const createBlogAPI = async (data) => {
  const url = `${API_URL}/create/`;
  console.log(data);
  var response;
  try {
    response = await axios.post(url, data);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
  return response.status;
};

export const getBlogAPI = async (pk) => {
  const url = `${API_URL}/manage/${pk}/`;
  return axios.get(url).then((response) => response.data);
};

export const updateBlogAPI = async (pk, data) => {
  const url = `${API_URL}/manage/${pk}/`;
  return axios.patch(url, data).then((response) => {
    return response;
  });
};

export const deleteBlogAPI = async (pk) => {
  const url = `${API_URL}/manage/${pk}/`;
  return axios.delete(url).then((response) => {
    return response;
  });
};

export const likeBlogAPI = async (user_pk, blog_pk) => {
  const url = `${API_URL}/like/${blog_pk}/${user_pk}/`;
  return axios.get(url);
};

export const saveBlogAPI = async (user_pk, blog_pk) => {
  const url = `${API_URL}/save/${blog_pk}/${user_pk}/`;
  return axios.get(url);
};

export const feedAPI = async () => {
  const url = `${API_URL}/feed/`;
  return axios.get(url).then((response) => response.data);
};
