import axios from "../axios";

const getAllCabinets = () => {
    return axios.get("/api/v1/locker/get-all");
};

const createNewCabinetService = (data) => {
    return axios.post("/api/v1/locker/add-locker", data);
};

const editCabinetService = (inputData) => {
    return axios.put("/api/v1/locker/edit", inputData);
};

const deleteCabinetService = (lockerId) => {
    return axios.delete(`/api/v1/locker/delete?locker_id=${lockerId}`);
};

export { getAllCabinets, createNewCabinetService, editCabinetService, deleteCabinetService };
