import axios from 'axios';
const API = "http://localhost:8000/api";


export const accountCreater = async () => {
    const url = `${API}/account/create/`;
    console.log(url);
};


export const accountLogger = async (data) => {
    const url = `${API}/account/login/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response.status;
};


export const accountViewer = async (pname) => {
    const url = `${API}/account/manage/${pname}`;
    return axios.get(url).then(response => response.data);
};


export const accountEditor = async () => {
    const url = `${API}/account/edit/`;
    console.log(url);
};


export const accountDeleter = async () => {
    const url = `${API}/account/delete/`;
    console.log(url);
};
