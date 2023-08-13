import axios from "../axios";

const getTotalBusiness = () => {
    return axios.get("/get-total-business");
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

export { getTotalBusiness, getTotalBox, getTotalOrder, getTotalCabinet };
