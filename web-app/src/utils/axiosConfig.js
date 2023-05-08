import axios from "axios";

var endpoint;

if (process.env.REACT_APP_ENV === "DEV") {
  endpoint = process.env.REACT_APP_ENDPOINT_DEV;
} else {
  endpoint = process.env.REACT_APP_ENDPOINT_PROD;
}

const api = axios.create({
  baseURL: endpoint,
});

export default api;
