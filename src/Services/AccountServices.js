import axios from 'axios';
//const API = "http://localhost:8000/api";
const API = "https://keyblogs.herokuapp.com/api";


export const accountCreator = async (data) => {
    const url = `${API}/account/create/`;
    return axios.post(url, data).then(response => { return response })
};

export const usernameCreator = async (pk, data) => {
    const url = `${API}/account/username/${pk}`;
    return axios.post(url, data).then(response => { return response })
}


export const accountLogger = async (data) => {
    const url = `${API}/account/login/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response;
};


export const accountViewer = async (pname) => {
    const url = `${API}/account/manage/${pname}`;
    return axios.get(url).then(response => response.data);
};


export const accountEditor = async (pname, data) => {
    const url = `${API}/account/manage/${pname}`;
    return axios.patch(url, data).then(response => {return response;})
};


export const accountDeleter = async (pname, data) => {
    const url = `${API}/account/delete/${pname}`;
    return axios.post(url, data).then(response => {return response});
};

export const accountLogout = async (pk) => {
    const url = `${API}/account/logout/${pk}`;
    axios.get(url);
}