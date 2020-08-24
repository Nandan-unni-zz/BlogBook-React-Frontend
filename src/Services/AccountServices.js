//import axios from 'axios';
const API = "http://localhost:8000/api";


export const accountCreater = async () => {
    const url = `${API}/account/create/`;
    console.log(url);
};


export const accountLogger = async () => {
    const url = `${API}/account/login/`;
    console.log(url);
};


export const accountViewer = async () => {
    const url = `${API}/account/view/`;
    console.log(url);
};


export const accountEditor = async () => {
    const url = `${API}/account/edit/`;
    console.log(url);
};


export const accountDeleter = async () => {
    const url = `${API}/account/delete/`;
    console.log(url);
};
