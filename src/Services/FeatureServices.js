import axios from 'axios';
const API = "http://localhost:8000/api";
//const API = "https://keyblogs.herokuapp.com/api";
export const loginTool = async (data) => {
    const url = `${API}/login/`;
    var response;
    try {
        response = await axios.post(url, data);
        console.log(response.status);
    } catch(error) {
        console.log(error);
    };
    return response;
};


export const logoutTool = async (pk) => {
    const url = `${API}/logout/${pk}`;
    axios.get(url);
}


export const feedTool = async () => {
    const url = `${API}/feed/`;
    return axios.get(url).then(response => response.data);
};


export const messageTool = async () => {
    const url = `${API}/message/`;
    return axios.get(url).then(response => response.data);
};


export const searchTool = async () => {
    const url = `${API}/search/`;
    return axios.get(url).then(response => response.data);
};

export const notificationTool = async () => {
    const url = `${API}/notification/`;
    return axios.get(url).then(response => response.data);
};