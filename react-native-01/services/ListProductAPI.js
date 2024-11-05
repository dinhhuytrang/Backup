import axios from "./customizeAPI";

const getAllListProduct = () => {
  return axios.get("/products");
};
const getProduct = () => {
  return axios.get("/products/top");
};
// Club
const getAllClub = () => {
  return axios.get("/clubs");
};

// get products details
const getProductByID = (productId) => {
  return axios.get(`products/${productId}`);
};

// get to card 
const addNewCart = (newCart) => {
  return axios.post(`/cart/add`, newCart);
}
// get all cart

const getAllCart = () => {
  return axios.get("/cart");
};

// update cart
export { getAllListProduct, getAllClub, getProductByID, addNewCart, getAllCart, getProduct };