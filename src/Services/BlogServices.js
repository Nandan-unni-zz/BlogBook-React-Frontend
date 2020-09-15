import axios from 'axios';
const API = "http://localhost:8000/api";
//const API = "https://keyblogs.herokuapp.com/api";


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
    const url = `${API}/blog/manage/${pk}/`;
    return axios.get(url);
};


export const blogEditor = async (pk) => {
    const url = `${API}/blog/manage/${pk}/`;
    return axios.patch(url);
};


export const blogLiker = async (user_pk, blog_pk) => {
    const url = `${API}/blog/like/${blog_pk}/${user_pk}/`;
    return axios.get(url);
};


export const blogSaver = async (user_pk, blog_pk) => {
    const url = `${API}/blog/save/${blog_pk}/${user_pk}/`;
    axios.get(url);
};


export const blogDeleter = async (pk) => {
    const url = `${API}/blog/delete/${pk}`;
    return axios.delete(url);
};
