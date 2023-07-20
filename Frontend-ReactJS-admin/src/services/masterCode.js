import axios from "../axios";

const editMasterCode = (masterCodeId, inputData) => {
    return axios.put(`/api/v1/masterCode/edit-master-code/${masterCodeId}`, inputData);
};

const getMasterCodeById = (cabinetId) => {
    return axios.get(`/api/v1/masterCode/edit-master-code/${cabinetId}`);
};

export { editMasterCode, getMasterCodeById };
