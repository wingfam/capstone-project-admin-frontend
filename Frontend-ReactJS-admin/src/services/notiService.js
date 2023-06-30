import axios from "../axios";

const getAllNotis = (inputId) => {
    return axios.get(`/api/get-all`);
};

const editNotiService = (inputData) => {
    return axios.put("/api/edit-noti", inputData);
};

export { getAllNotis, editNotiService };
