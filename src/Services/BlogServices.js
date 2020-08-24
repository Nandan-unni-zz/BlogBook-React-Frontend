//import axios from 'axios';
const API = "http://localhost:8000/api/";


export const blogCreater = async () => {
    const url = `${API}/blog/create/`;
    console.log(url);
};


export const blogSaver = async () => {
    const url = `${API}/blog/save/`;
    console.log(url);
}


export const blogViewer = async () => {
    const url = `${API}/blog/view/`;
    console.log(url);
};


export const blogEditor = async () => {
    const url = `${API}/blog/edit/`;
    console.log(url);
};


export const blogDeleter = async () => {
    const url = `${API}/blog/delete/`;
    console.log(url);
};
