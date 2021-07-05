import axios from "axios";
import { config } from "../config";

const API_URL = config.BASE_API_URL + "/api/writer";

export const loginWriterAPI = async (data) => {
  const url = `${API_URL}/login/`;
  var response;
  try {
    response = await axios.post(url, data);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const logoutWriterAPI = async (pk) => {
  const url = `${API_URL}/logout/${pk}/`;
  axios.get(url);
};

export const createWriterAPI = async (data) => {
  const url = `${API_URL}/create/`;
  return axios.post(url, data).then((response) => {
    return response;
  });
};

export const setupWriterAPI = async (pk, data) => {
  const url = `${API_URL}/setup/${pk}/`;
  return axios.post(url, data).then((response) => {
    return response;
  });
};

export const getWriterAPI = async (pname) => {
  const url = `${API_URL}/manage/${pname}/`;
  return axios.get(url).then((response) => response.data);
};

export const updateWriterAPI = async (pname, data) => {
  const url = `${API_URL}/manage/${pname}/`;
  return axios.patch(url, data).then((response) => {
    return response;
  });
};

export const deleteWriterAPI = async (pname, data) => {
  const url = `${API_URL}/delete/${pname}/`;
  var response;
  try {
    response = await axios.post(url, data);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const getWritersAPI = async () => {
  const url = `${API_URL}/search/`;
  return axios.get(url).then((response) => response.data);
};

export const followWriterAPI = async (user_pk, writer_pk) => {
  const url = `${API_URL}/follow/${user_pk}/${writer_pk}/`;
  return axios.get(url).then((response) => {
    return response;
  });
};

export const searchWriterAPI = async (data) => {
  const url = `${API_URL}/search/`;
  return axios.post(url, data).then((response) => {
    return response;
  });
};
