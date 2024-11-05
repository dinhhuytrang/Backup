import axios from "./customizeAPI";

const viewProfile = (userId) => {
  return axios.get(`/user/profile/${userId}`);
};

const updateProfile = (userId, data) => {
  return axios.put(`/user/profile/${userId}`, data);
};
// view address 

const viewAddress = (userId) => {
  return axios.get(`/user/profile/${userId}/address`);
};
// delet address

const deleteAddress = (userId, addressId) => {
  return axios.delete(`/user/profile/${userId}/address/${addressId}`);
};
export { viewProfile, updateProfile,viewAddress,deleteAddress };
