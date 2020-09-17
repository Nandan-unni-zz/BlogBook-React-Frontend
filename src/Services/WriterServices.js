import axios from 'axios';
const API = "http://localhost:8000/api";
//const API = "https://keyblogsapi.herokuapp.com/api";


export const loginWriterAPI = async (data) => {
    const url = `${API}/writer/login/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response;
};


export const logoutWriterAPI = async (pk) => {
    const url = `${API}/writer/logout/${pk}/`;
    axios.get(url);
}


export const createWriterAPI = async (data) => {
    const url = `${API}/writer/create/`;
    return axios.post(url, data).then(response => { return response })
};


export const setupWriterAPI = async (pk, data) => {
    const url = `${API}/writer/setup/${pk}/`;
    return axios.post(url, data).then(response => { return response })
}


export const getWriterAPI = async (pname) => {
    const url = `${API}/writer/manage/${pname}/`;
    return axios.get(url).then(response => response.data);
};


export const updateWriterAPI = async (pname, data) => {
    const url = `${API}/writer/manage/${pname}/`;
    return axios.patch(url, data).then(response => {return response;})
};


export const deleteWriterAPI = async (pname, data) => {
    const url = `${API}/writer/delete/${pname}/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response;
};


export const searchWriterAPI = async () => {
    const url = `${API}/writer/search/`;
    return axios.get(url).then(response => response.data);
};