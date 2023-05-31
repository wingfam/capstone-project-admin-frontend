import axios from "../axios";

const getAllCabinets = (inputId) => {
    return axios.get(`/api/get-all-cabinets?id=${inputId}`);
};

const createNewCabinetService = (data) => {
    return axios.post("/api/create-new-cabinet", data);
};

const editCabinetService = (inputData) => {
    return axios.put("/api/edit-cabinet", inputData);
};

const deleteCabinetService = (cabinetId) => {
    return axios.delete("/api/delete-cabinet", {
        data: {
            id: cabinetId,
        },
    });
};

export { getAllCabinets, createNewCabinetService, editCabinetService, deleteCabinetService };
