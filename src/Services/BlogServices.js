import axios from 'axios';
//const API = "http://localhost:8000/api";
const API = "https://keyblogsapi.herokuapp.com/api";


export const createBlogAPI = async (data) => {
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


export const getBlogAPI = async (pk) => {
    const url = `${API}/blog/manage/${pk}/`;
    return axios.get(url).then(response => response.data);
};


export const updateBlogAPI = async (pk, data) => {
    const url = `${API}/blog/manage/${pk}/`;
    return axios.patch(url, data).then(response => {return response;})
};


export const deleteBlogAPI = async (pk) => {
    const url = `${API}/blog/manage/${pk}/`;
    return axios.delete(url).then(response => {return response;})
};


export const likeBlogAPI = async (user_pk, blog_pk) => {
    const url = `${API}/blog/like/${blog_pk}/${user_pk}/`;
    return axios.get(url);
};


export const saveBlogAPI = async (user_pk, blog_pk) => {
    const url = `${API}/blog/save/${blog_pk}/${user_pk}/`;
    return axios.get(url);
};


export const feedAPI = async () => {
    const url = `${API}/blog/feed/`;
    return axios.get(url).then(response => response.data);
};
