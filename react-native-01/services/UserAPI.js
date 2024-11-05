import axios from "./customizeAPI";

const viewProfile = (userId) => {
  return axios.get(`/user/profile/${userId}`);
};

const updateProfile = (userId, data) => {
  return axios.put(`/user/profile/${userId}`, data);
};

export { viewProfile, updateProfile };
