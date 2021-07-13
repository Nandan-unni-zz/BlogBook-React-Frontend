import axios from "axios";

import { config } from "../../config";
import { logger } from "../../utils";

const API_URL = `${config.BASE_API_URL}/api/writer`;

export const signupService = async (data) => {
  const url = `${API_URL}/create/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const loginService = async (data) => {
  const url = `${API_URL}/login/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const logoutService = async (userId) => {
  const url = `${API_URL}/logout/${userId}/`;
  try {
    await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
};
