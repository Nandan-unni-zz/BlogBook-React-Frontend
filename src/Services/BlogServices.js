import axios from 'axios';
//const API = "http://localhost:8000/api";
const API = "https://keyblogs.herokuapp.com/api";


export const blogCreater = async (data) => {
    const url = `${API}/blog/create/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response.status;
};


export const blogViewer = async (pk) => {
    const url = `${API}/blog/view/${pk}`;
    console.log(url);
};


export const blogEditor = async (pk) => {
    const url = `${API}/blog/edit/${pk}`;
    console.log(url);
};


export const blogLiker = async (blog_pk, user_pk) => {
    const url = `${API}/blog/like/${blog_pk}/${user_pk}`;
    return axios.get(url);
};


export const blogBMarker = async (pk) => {
    const url = `${API}/blog/bmark/${pk}`;
    axios.get(url);
};


export const blogDeleter = async (pk) => {
    const url = `${API}/blog/delete/${pk}`;
    console.log(url);
};
