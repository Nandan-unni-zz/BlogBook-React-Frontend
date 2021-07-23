import axios from "axios";

import { config } from "../../config";
import { logger } from "../../utils";

const API_URL = `${config.BASE_API_URL}/api/auth`;

export const signupService = async (data) => {
  const url = `${API_URL}/signup/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const loginService = async (data) => {
  const url = `${API_URL}/signin/`;
  let res = {};
  try {
    res = await axios.post(url, data);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
  return res;
};

export const logoutService = async (userId) => {
  const url = `${API_URL}/signout/${userId}/`;
  try {
    await axios.get(url);
  } catch (err) {
    logger.err(err, "Server Down. Please try again later.");
  }
};
