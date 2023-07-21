import axios from "../axios";

const editMasterCode = (masterCodeId, inputData) => {
    return axios.put(`/api/v1/masterCode/edit-master-code?id=${masterCodeId}`, inputData);
};

const getMasterCodeById = (cabinetId) => {
    return axios.get(`/api/v1/masterCode/get-mastercode-by-cabinet-id?cabientId=${cabinetId}`);
};

export { editMasterCode, getMasterCodeById };
