import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT, 
});
console.log(process.env.ENDPOINT);
export default api;
