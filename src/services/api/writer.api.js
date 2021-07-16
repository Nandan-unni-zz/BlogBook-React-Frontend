import axios from "axios";

import { config } from "../../config";
import { logger } from "../../utils";

const API_URL = `${config.BASE_API_URL}/api/writer`;

export const getUsernamesAndEmailsService = async () => {
  const url = `${API_URL}/usernamesandemails/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const setupWriterService = async (userId, data) => {
  const url = `${API_URL}/setup/${userId}/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const getWriterService = async (pname) => {
  const url = `${API_URL}/manage/${pname}/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const getWritersService = async () => {
  const url = `${API_URL}/search/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const followWriterService = async (userId, followUserId) => {
  const url = `${API_URL}/follow/${userId}/${followUserId}/`;
  let res = {};
  try {
    res = await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const searchWriterService = async (data) => {
  const url = `${API_URL}/search/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const updateWriterService = async (pname, data) => {
  const url = `${API_URL}/manage/${pname}/`;
  let res = {};
  try {
    res = await axios.patch(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const deleteWriterService = async (pname, data) => {
  const url = `${API_URL}/delete/${pname}/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};
