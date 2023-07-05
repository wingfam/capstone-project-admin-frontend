import axios from "../axios";

const getAllLocations = () => {
    return axios.get("/api/v1/location/get-all");
};

const getALocation = (lockerId) => {
    return axios.get(`/api/v1/location/search?id=${lockerId}`);
};

const createNewLocation = (data) => {
    return axios.post("/api/v1/location/add-cabinet", data);
};

const editLocation = (lockerId, inputData) => {
    return axios.put(`/api/v1/location/edit-cabinet?id=${lockerId}`, inputData);
};

export {
    getALocation,
    getAllLocations,
    createNewLocation,
    editLocation
};
