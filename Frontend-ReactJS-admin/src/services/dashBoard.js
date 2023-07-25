import axios from "../axios";

const getTotalResident = () => {
    return axios.get("/get-total-resident");
};


const getTotalBox = () => {
    return axios.get("/get-total-box");
};

const getTotalOrder = () => {
    return axios.get("/get-total-order");
};

const getTotalCabinet = () => {
    return axios.get("/get-total-cabinet");
};

export { getTotalResident, getTotalBox, getTotalOrder, getTotalCabinet };
