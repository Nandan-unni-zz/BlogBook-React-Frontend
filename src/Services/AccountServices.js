import axios from 'axios';
const API = "http://localhost:8000/api";
//const API = "https://keyblogs.herokuapp.com/api";


export const accountCreator = async (data) => {
    const url = `${API}/writer/create/`;
    return axios.post(url, data).then(response => { return response })
};

export const usernameCreator = async (pk, data) => {
    const url = `${API}/writer/username/${pk}`;
    return axios.post(url, data).then(response => { return response })
}


export const accountViewer = async (pname) => {
    const url = `${API}/writer/manage/${pname}`;
    return axios.get(url).then(response => response.data);
};


export const accountEditor = async (pname, data) => {
    const url = `${API}/writer/manage/${pname}`;
    return axios.patch(url, data).then(response => {return response;})
};


export const accountDeleter = async (pname, data) => {
    const url = `${API}/writer/delete/${pname}`;
    return axios.post(url, data).then(response => {return response});
};

