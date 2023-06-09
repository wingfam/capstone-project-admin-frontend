import axios from "../axios";

const getAllNotis = (inputId) => {
    return axios.get(`/api/get-all-notis?id=${inputId}`);
};

const createNewNotiService = (data) => {
    return axios.post("/api/create-new-noti", data);
};

const editNotiService = (inputData) => {
    return axios.put("/api/edit-noti", inputData);
};

export { getAllNotis, createNewNotiService, editNotiService };
