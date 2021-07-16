import axios from "axios";

import { config } from "../../config";
import { logger } from "../../utils";

const API_URL = `${config.BASE_API_URL}/api/blog`;

export const createBlogService = async (data) => {
  const url = `${API_URL}/create/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const getBlogService = async (blogId) => {
  const url = `${API_URL}/manage/${blogId}/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const getBlogsService = async () => {
  const url = `${API_URL}/feed/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const likeBlogService = async (blogId, userId) => {
  const url = `${API_URL}/like/${blogId}/${userId}/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const saveBlogService = async (blogId, userId) => {
  const url = `${API_URL}/save/${blogId}/${userId}/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const updateBlogService = async (blogId, data) => {
  const url = `${API_URL}/manage/${blogId}/`;
  let res = {};
  try {
    res = await axios.patch(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const deleteBlogService = async (blogId) => {
  const url = `${API_URL}/manage/${blogId}/`;
  let res = {};
  try {
    res = await axios.delete(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};
